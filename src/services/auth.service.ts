import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private state: StateService
  ) { }

  get isAuthenticated() {
    const st = (this.state.get('access_jwt')) ? true : false;
    if(!st) {
      this.state.clearVolatileState();
      this.router.navigate([''])
    }
    return st;
  }

  retreiveToken(user, password) {
    return this.http.post<any>('users', {
      user,
      password
    });
  }
}
