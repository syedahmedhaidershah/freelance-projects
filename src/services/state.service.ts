import { Injectable, isDevMode } from '@angular/core';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  state: any = {};
  volatile: any = {};

  worker: Worker | null = null;

  temp: any;

  constructor(
    private general: GeneralService
  ) {
    // this.init();
  }

  init = () => {
    // this.setupWorker();
  }

  setupWorker = () => {
    // this.worker = new Worker('../workers/state.worker.ts', { type: 'module' });
  }

  set = (key: string, value: any) => {
    this.volatile[key] = value;
  }

  get = (key: string) => {
    return this.volatile[key];
  }

  remove = (key: string) => {
    delete this.volatile[key];
  }

  getVolatileState = () => this.volatile;

  clearVolatileState = () => {
    this.volatile = {};
  }

  setProp = async (key: string, value: any) => {
    let toRet = null;
    this.worker.addEventListener('message', (ev) => {
      const {
        data: {
          message: {
            key,
            value
          }
        }
      } = ev;
      toRet = value;
    })
    this.worker.postMessage({
      topic: 'set',
      message: {
        key,
        value
      }
    });
    for await (let i of this.general.getGen(100, 6)) {
      if (toRet) {
        this.worker.removeEventListener('message', (ev) => { });
        break;
      }
    }
    return toRet;
  }

  getProp = async (key: string) => {
    let toRet = null;
    this.worker.addEventListener('message', (ev) => {
      const {
        data: {
          message: {
            key,
            value
          }
        }
      } = ev;
      toRet = value;
    })
    this.worker.postMessage({
      topic: 'get',
      message: {
        key
      }
    });
    for await (let i of this.general.getGen(100, 6)) {
      if (toRet) {
        this.worker.removeEventListener('message', (ev) => { });
        break;
      }
    }
    return toRet;
  }

  removeProp = async (key: string) => {
    let toRet = null;
    this.worker.addEventListener('message', (ev) => {
      const {
        data: {
          message: {
            key,
            value
          }
        }
      } = ev;
      toRet = value;
    })
    this.worker.postMessage({
      topic: 'remove',
      message: {
        key
      }
    });
    for await (let i of this.general.getGen(100, 6)) {
      if (toRet) {
        this.worker.removeEventListener('message', (ev) => { });
        break;
      }
    }
    return toRet;
  }

  getState = async () => {
    let toRet = null;
    this.worker.addEventListener('message', (ev) => {
      const {
        data: {
          message: {
            state
          }
        }
      } = ev;
      toRet = state;
    })
    this.worker.postMessage({
      topic: 'state'
    });
    for await (let i of this.general.getGen(100, 6)) {
      if (toRet) {
        this.worker.removeEventListener('message', (ev) => { });
        break;
      }
    }
    return toRet;
  }

  clearState = async () => {
    let toRet = null;
    this.worker.addEventListener('message', (ev) => {
      const {
        data: {
          message: {
            state
          }
        }
      } = ev;
      toRet = state;
    })
    this.worker.postMessage({
      topic: 'clear'
    });
    for await (let i of this.general.getGen(100, 6)) {
      if (toRet) {
        this.worker.removeEventListener('message', (ev) => { });
        break;
      }
    }
    return toRet;
  }
}
