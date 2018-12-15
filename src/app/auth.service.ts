import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LoginData {
  error: boolean;
  message: string;
  token: string;
  datetime: string;
}

interface TokenData {
  error: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public logKey = 'loggedIn';
  public loggedInStatus = JSON.parse(localStorage.getItem(this.logKey)) || 'false';


  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem(this.logKey, JSON.stringify(value));
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem(this.logKey)) || this.loggedInStatus;
  }

  getUserDetails(username, password) {
    return this.http.post<LoginData>('/api/auth', {
      username,
      password
    });
  }

  checkForToken(value, datetime) {
    return this.http.post<TokenData>('/api/verifytoken', {
      value,
      datetime
    });
  }
}
