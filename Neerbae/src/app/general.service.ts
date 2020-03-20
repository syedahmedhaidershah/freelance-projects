import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  capitalizeWord(str) {
    return str.substring(0, 1).toUpperCase().concat(str.substr(1));
  }

  capitalizeDashedWord(str) {
    return str.split('-').map(s => s.substring(0, 1).toUpperCase().concat(s.substr(1))).join('-');
  }

  getCamelCasedWordFromPhrase(str: string) {
    const parts = str.split(' ');
    const firstWord = parts[0].toLowerCase();
    parts.splice(0, 1);
    return firstWord.concat(parts.map(w => this.capitalizeWord(w)).join(''));
  }

  stripTags(html: string, exclude: Array<string>) {
    exclude.forEach(exc => {
      const r1 = new RegExp(`[<][${exc}][>]`);
      const r2 = new RegExp(`[<][\/][${exc}][>]`);
      for (; r1.test(html);) {
        html = html.replace(r1, `||${exc}||`);
      }
      for (; r2.test(html);) {
        html = html.replace(r2, `__${exc}||`);
      }
    });
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    html = tmp.textContent || tmp.innerText;
    exclude.forEach(exc => {
      const r1 = new RegExp(`[|][|][${exc}][|][|]`);
      const r2 = new RegExp(`[_][_][${exc}][|][|]`);
      for (; r1.test(html);) {
        html = html.replace(r1, `<${exc}>`);
      }
      for (; r2.test(html);) {
        html = html.replace(r2, `</${exc}>`);
      }
      html = html.replace(r1, `<${exc}>`);
      html = html.replace(r2, `</${exc}>`);
    });
    return html;
  }

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
            if (item.hasOwnProperty(i)) {
              cloneObject[i] = clone(item[i]);
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
}
