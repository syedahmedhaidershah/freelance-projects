import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjRes } from './obj-res';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated() {
    const st = (localStorage.getItem('TEMP_USER_PROF')) ? true : false;
    return st;
  }

  authenticateBypass(obj: any) {
    localStorage.setItem(obj.key, JSON.stringify(obj.value));
  };

  retreiveToken() {
    const user = JSON.parse(localStorage.getItem('TEMP_USER_PROF'));
    return this.http.post<ObjRes>('users', {
      googleId: user.id,
      emailAddress: user.emailAddress
    });
  }
}
