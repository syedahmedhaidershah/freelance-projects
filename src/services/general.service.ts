import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
  ) { }

  capitalizeWord(str) {
    return str.substring(0, 1).toUpperCase().concat(str.substr(1));
  }

  capitalizeDashedWord(str) {
    return str.split('-').map(s => this.capitalizeWord(s)).join('-');
  }

  getCamelCasedWordFromPhrase(str: string) {
    const parts = str.split(' ');
    const firstWord = parts[0].toLowerCase();
    parts.splice(0, 1);
    return firstWord.concat(parts.map(w => this.capitalizeWord(w)).join(''));
  }

  getUpperCamelCasedWordFromDashed = (str: string) => {
    const parts = str.split('-');
    return parts.map(w => this.capitalizeWord(w)).join(' ');
  }

  stripTags(html: any, exclude: Array<string>) {
    exclude.forEach(exc => {
      exc = exc.replace(/\s/g, '\\\s');
      const r1 = new RegExp(
        exc.length === 1 ?
          `[<][${exc}][>]` :
          `[<]${exc}[>]`
      );
      const r2 = new RegExp(
        exc.length === 1 ?
          `[<][\/][${exc}][>]` :
          `[<][\/][${exc.substr(0, 1)}][>]`
      );
      for (; r1.test(html);) {
        html = exc.length === 1 ?
          html.replace(r1, `||${exc}||`) :
          html.replace(r1, `||u style="color: rgb(102, 102, 102);"||`);
      }
      for (; r2.test(html);) {
        html = exc.length === 1 ?
          html = html.replace(r2, `__${exc}||`) :
          html = html.replace(r2, exc.substr(0, 1));
      }
    });
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    html = tmp.textContent || tmp.innerText;
    exclude.forEach(exc => {
      exc = exc.replace(/\s/g, '\\\s');
      const r1 = new RegExp(
        exc.length === 1 ?
          `[|][|][${exc}][|][|]` :
          `[|][|]${exc}[|][|]`
      );
      const r2 = new RegExp(
        exc.length === 1 ?
          `[_][_][${exc}][|][|]` :
          `[_][_][${exc.substr(0, 1)}][|][|]`
      );
      for (; r1.test(html);) {
        html = exc.length === 1 ?
          html.replace(r1, `<${exc}>`) :
          html.replace(r1, `<u style="color: rgb(102, 102, 102);">`)
      }
      for (; r2.test(html);) {
        html = exc.length === 1 ?
          html.replace(r2, `</${exc}>`) :
          html.replace(r2, `</${exc.substr(0, 1)}>`);
      }
      html = exc.length === 1 ?
        html.replace(r1, `<${exc}>`) :
        html.replace(r1, `<u style="color: rgb(102, 102, 102);">`);
      html = exc.length === 1 ?
        html.replace(r2, `</${exc}>`) :
        html.replace(r2, `</${exc.substr(0, 1)}>`);
    });
    return html;
  }

  // clone = (item) => {
  //    // not object, not array, therefore primitive
  // }

  deepClone(obj) {
    let visitedNodes = [];
    let clonedCopy = [];
    function clone(item) {
      if (typeof item === "object" && !Array.isArray(item)) {
        if (visitedNodes.indexOf(item) === -1) {
          visitedNodes.push(item);
          let cloneObject = {};
          clonedCopy.push(cloneObject);
          for (let i in item) {
            if (item.hasOwnProperty) {
              if (item.hasOwnProperty(i)) {
                cloneObject[i] = clone(item[i]);
              }
            } else {
              return {};
            }
          }
          return cloneObject;
        } else {
          return clonedCopy[visitedNodes.indexOf(item)];
        }
      }
      else if (typeof item === "object" && Array.isArray(item)) {
        if (visitedNodes.indexOf(item) === -1) {
          let cloneArray = [];
          visitedNodes.push(item);
          clonedCopy.push(cloneArray);
          for (let j = 0; j < item.length; j++) {
            cloneArray.push(clone(item[j]));
          }
          return cloneArray;
        } else {
          return clonedCopy[visitedNodes.indexOf(item)];
        }
      }

      return item; // not object, not array, therefore primitive
    }
    return clone(obj);
  }

  async getPromisifiedValue(val: any) {
    const evaluated = await val;
    return evaluated;
  }

  getOffsetUntilBody(el: any) {
    let offset = 0;

    // console.log(el);
    offset += el.offsetTop;

    if (el.offsetParent.constructor.name !== 'HTMLBodyElement') {
      offset += this.getOffsetUntilBody(el.offsetParent);
    }

    return offset;
  }

  Uint8ToBase64 = (u8Arr) => {
    const CHUNK_SIZE = 0x8000; //arbitrary number
    let index = 0;
    const length = u8Arr.length;
    let result = '';
    let slice;
    while (index < length) {
      slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
      result += String.fromCharCode.apply(null, slice);
      index += CHUNK_SIZE;
    }
    return btoa(result);
  }

  fetchAndGetB64 = async (uri: string) => {
    const elemContent = await fetch(uri);
    const reader = await elemContent.body.getReader();
    const contentType = elemContent.headers.get('content-type')

    let arr = []
    let chunks = await reader.read();
    // const decoder = new TextDecoder('utf8');
    let continueFlag = true;

    arr = Array.from(chunks.value)

    for (; continueFlag;) {
      chunks = await reader.read();
      if (chunks.value) {
        arr = arr.concat(Array.from(chunks.value))
      } else {
        continueFlag = false;
      }
    }

    const uIntArr = new Uint8Array(arr);

    const b64 = this.Uint8ToBase64(uIntArr);

    return Promise.resolve(`data:${contentType};base64,${b64}`);
  }

  restoreWindowBeforeUnload = () => {
    window.onbeforeunload = () => { return true };
  }

  isJson(str: string) {
    return (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
      ? true : false;
  }

  dynamicArray = (i: number) => Array.apply(null, new Array(i)).map((e, i) => i);

  /**
 * Get a promise that resolves after an argument number of milliseconds
 * @param {number} t no of milliseconds
 * @returns {Promise<number>} Resolves to the milliseconds awaited for.
 */
  promiseTimeout = (t?: number) => new Promise((resolve, reject) => setTimeout(() => {
    resolve(t);
  }, t));

  /** Get a generator to yeild after a specified time, blocked by an unresolved promise
   * @param {number} val - number of iterations for async generator 
  * @param {number} [timeout] - Number in milliseconds to set timer for
  * @returns { Promise<number>} Resolves to the milliseconds awaited for.
  */
  getGen = async function* (val, timeout?: number) {
    let i = 0;
    while (i < val) {
      if (timeout) {
        await this.promiseTimeout(timeout);
      }
      yield i++;
    }
  }


  /** Get a generator to yeild after a specified time, blocked by an unresolved promise
   * @param {number} obj - Object to check if it is number 
  * @returns {boolean} Returns true if the argument is a number
  */
  isNumber = (obj: any) => typeof obj === 'number';

  /** Prevents a default handler and renables it after execution of a custom method
   * @param {function} toPrevent - Object to check if it is number 
   * @param {function} toExecute - Execute a custom handler 
  * @returns {boolean} Returns true when executed
  */
  preventAndRenable = async (toPrevent, toExecute) => {
    toPrevent = ($e) => {
      const ev: Event = $e || window.event;
      ev.preventDefault();
      ev.stopImmediatePropagation();
      return false;
    }

    await toExecute();

    toPrevent = () => { };

    return false;
  }
}
