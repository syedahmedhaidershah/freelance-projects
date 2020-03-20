import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
  usernameRegex = /[A-Za-z0-9]{0,6}/i;
  passwordRegex = /[A-Za-z0-9.!]{0,16}/i;

  constructor() { }
}
