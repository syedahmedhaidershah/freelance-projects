/// <reference lib="webworker" />

import { loadModule, Hunspell, HunspellFactory } from 'hunspell-asm';
import * as _ from 'lodash';

interface OpInner {
  insert: string;
  attributes?: object;
}

interface DeltaOp {
  ops: Array<OpInner>;
}

let hunspellFactory: HunspellFactory;
let hunspell: Hunspell;

const splitters = [' ', '\s', '.', ',', ';', ':', '\n', '?', '!', '↵'];
const splitReg: RegExp = new RegExp(/[ ]{1}|[\s]{1}|[.]{1}|[,]{1}|[;]{1}|[:]{1}|[?]{1}|[!]{1}|[↵]{1}/g);

const getRexed = (str: string, regex: RegExp, dop: DeltaOp, i: number, attr?: object, charCount?: number): Array<any> => {
  const match = regex.exec(str);

  const phraseBefore = (match) ? str.substr(0, match.index) : str;
  const splitter = (match) ? str.substr(match.index, 1) : '';
  const phraseAfter = (match) ? str.substr(match.index + 1) : '';

  const prev = (!match) ? dop.ops
    .map((o, j) => (j < i) ? o.insert.length : 0)
    .reduce((t, a) => t + a) :
    0;

  charCount += !(match) ?
    phraseBefore.length + 1 :
    splitter.length;

  attr = (!match) ?
    (hunspell.spell(str)) ?
      {} :
      (!attr) ?
        { strike: true } :
        Object.assign(attr, { strike: true }) :
    attr;

  const before: any = (match) ?
    getRexed(
      phraseBefore,
      regex,
      dop,
      i,
      attr,
      charCount) :
    (attr) ?
      { insert: str, attributes: attr } :
      { insert: str };

  const separator = (match) ?
    (attr) ?
      { insert: splitter, attributes: attr } :
      { insert: splitter } :
    '';
  // { insert: str };

  const after = (match) ?
    getRexed(
      phraseAfter,
      regex,
      dop,
      i,
      attr,
      charCount) :
    '';

  if (!match) {
    if (!hunspell.spell(str)) {
      Object.assign(before, { retain: (prev === 0) ? charCount : prev, delete: prev + str.length });
    } else {
      if (typeof before.attributes === 'object') {
        delete before.attributes.strike;
      }
    }
  } else {
    Object.assign(separator, { retain: (prev === 0) ? charCount + 1 : prev + 1, delete: 0 });
    // Object.assign(after, { retain: (phraseAfter.length > 0) ? charCount : , delete: 0 });
  }

  // (attr) ?
  //   { insert: str, attributes: attr } :
  //   { insert: str };
  // (match) ?
  //   (attr) ?
  //     { insert: getRexed(str.substr(match.index + 1), regex, attr), attributes: attr } :
  //     { insert: getRexed(str.substr(match.index + 1), regex, attr) } :
  //   '';
  return _.flattenDeep([before, separator, after]).filter(el => el !== '');
};

(async () => {
  hunspellFactory = await loadModule();
})();

const worker = {
  mem: null,
  dic: null,
  aff: null,
  affBuff: null,
  dicBuff: null,
  hunspell: null,
  hunxhr: new XMLHttpRequest(),
  lang: 'en',
  xhrCallback: (res: any) => { console.log(res); },
  uri: 'http://ec2-18-191-184-78.us-east-2.compute.amazonaws.com:9897',
  // uri: 'http://localhost:9897',
  init: async () => {
    return await worker.setXhr();
  },
  sendXhr: (query: string, uri?: string, method?: string) => {
    method = (method) ? method : 'GET';
    uri = (uri) ? uri : '';
    worker.hunxhr.open(
      method,
      (method === 'GET') ? `${worker.uri}${uri}?${query}` : worker.uri,
      true
    );
    worker.hunxhr.send(query);
  },
  setXhr: async (c?: (response) => void) => {
    worker.hunxhr.onreadystatechange = () => {
      if (worker.hunxhr.readyState === 4 && worker.hunxhr.status === 200) {
        if (c) {
          worker.xhrCallback = c;
        }
        worker.xhrCallback(worker.hunxhr.response);
      }
    };
    return await Promise.resolve(true);
  },
  loadMem: () => {
    worker.setXhr((res) => {
      worker.mem = res;
      worker.loadDict();
    });
    worker.sendXhr(
      'file=mem'
    );
  },
  loadDict: () => {
    worker.setXhr((res) => {
      worker.dic = res;
      worker.loadAff();
    });
    worker.sendXhr(
      'lang=en&file=dic', '/dicaff'
    );
  },
  loadAff: () => {
    worker.setXhr((res) => {
      worker.aff = res;
    });
    worker.sendXhr(
      'lang=en&file=aff', '/dicaff'
    );
  }
};

const state = worker.init();
if (state) {
  worker.loadDict();
}

addEventListener('message', ({ data }) => {
  let suggestions;

  switch (data.topic) {

    case 'hunspell-registered':
      const hci = setInterval(() => {
        if (hunspellFactory) {

          let affBuffer: any;
          let dicBuffer: any;

          const enc = new TextEncoder();

          affBuffer = new Uint8Array(enc.encode(worker.aff));
          dicBuffer = new Uint8Array(enc.encode(worker.dic));

          worker.affBuff = hunspellFactory.mountBuffer(affBuffer, `${worker.lang}.aff`);
          worker.dicBuff = hunspellFactory.mountBuffer(dicBuffer, `${worker.lang}.dic`);

          hunspell = hunspellFactory.create(worker.affBuff, worker.dicBuff);

          setTimeout(() => {
            postMessage({ topic: 'hunspell-instance-ready' });
            clearInterval(hci);
          }, 300);
        }
      }, 1000);
      break;

    case 'spell-check':
      // tslint:disable-next-line: max-line-length
      postMessage({ topic: 'checked-word', message: { word: data.message, correct: hunspell.spell(data.message), suggested: hunspell.suggest(data.message) } });
      break;

    case 'suggest':
      suggestions = worker.hunspell.suggest(data.word);
      postMessage({ topic: 'suggested-words', message: { word: data.message, suggestions } });
      break;

    case 'forward-contents':
      // tslint:disable-next-line: one-variable-per-declaration
      // console.log(data.message);
      const dop: DeltaOp = data.message;

      let dOps = dop.ops
        .map((o: OpInner, i: number) => {

          let strArrs = [];
          // let match = splitReg.exec(o.insert);

          // for (; match;) {
          //   strArrs = strArrs.concat(
          //     [o.insert.substr(match.index, 1), match]
          //   );
          //   match = splitReg.exec(o.insert);
          // }

          strArrs = getRexed(
            o.insert,
            splitReg,
            dop,
            i,
            o.attributes,
            0)
            .filter(el => el.insert !== '');

          return strArrs;
        });

      dOps = _.flattenDeep(dOps).filter(el => el.retain && el.delete);

      postMessage({ topic: 'checked-delta', message: dOps });
      break;

    default:
      console.log('forward-contents' === data.topic);
      console.error('unknown topic', data.topic);
      break;
  }
});
