import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
    const loader = document.getElementById('loader-container') as HTMLDivElement;
    setTimeout(() => {
      loader.classList.add('d-none');
    }, 100);
  }

  activateLoader(){
    const loader = document.getElementById('loader-container') as HTMLDivElement;
    loader.classList.remove('d-none');
  }

  changeMessage(message: string) {
    this.msgSrc.next(message);
  }

  changeObject(obj: object) {
    this.objSrc.next(JSON.stringify(obj));
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
