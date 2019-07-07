import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private msgSrc = new BehaviorSubject<string>('');
  currentMessage = this.msgSrc.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.msgSrc.next(message);
  }

}
