import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private states = {
    login: false,
    dashboard: false,
    exams: false,
    reports: false,
    help: false,
    createNewExams: false,
    createExistingExams: false,
    publishedExam: false
  };

  private msgSrc = new BehaviorSubject<string>('');
  private objSrc = new BehaviorSubject<string>('{}');
  private stateVariables = new BehaviorSubject<object>(this.states);

  currentMessage = this.msgSrc.asObservable();
  currentObj = this.objSrc.asObservable();
  currentStatae = this.stateVariables.asObservable();

  constructor() { }

  removeLoader() {
    try {
      const loader = document.getElementById('loader-container') as HTMLDivElement;
    setTimeout(() => {
      loader.classList.add('d-none');
    }, 100);
    } catch (exc) {
      if(isDevMode()) console.warn(exc);
      if(isDevMode()) console.log('Create a loader');
    }
  }

  activateLoader() {
    try {
      const loader = document.getElementById('loader-container') as HTMLDivElement;
      loader.classList.remove('d-none');
    } catch (exc) {
      if(isDevMode()) console.warn(exc);
      if(isDevMode()) console.log('Create a loader');
    }
  }

  changeMessage(message: string) {
    this.msgSrc.next(message);
    if (isDevMode()) console.warn('messagebroadcast: ', message);
  }

  changeObject(obj: any) {
    this.objSrc.next(JSON.stringify(obj));
    if (isDevMode()) console.warn('objectbroadcast: ', obj.topic);
  }

  loadedState(names: Array<string>) {
    names.forEach(name => {
      if (name === 'login') {
        this.removeLoader();
      } else {
        this.states.login = true;
        // this.states[name] = true;
        // if(Object.values(this.states).reduce((prev, curr) => prev && curr)) {
        if (this.states.hasOwnProperty(name)) {
          this.states[name] = true;
          this.removeLoader();
        }
        // }
      }
    });
    this.stateVariables.next(this.states);
  }

}
