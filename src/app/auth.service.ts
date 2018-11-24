import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface NormalResponse {
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

  getUserDetails(Email, Password) {
    return this.http.post<NormalResponse>('/api/inspector/login', {
      Email,
      Password
    });
  }
}

// this.setCookie(this.logKey, true,1 )
// this.local.set(this.logKey, true, 1, 'd');
// this.localStorage.getItem(this.logKey).subscribe((state) => {
//   return state || false;
// });

// let iat = decodedToken.iat;
// iat *= 1000;
// iat += this.timeZoneShift;
// const now = new Date();
// const lastMidNight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
// const expirationDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
// const isExpired = ((iat - lastMidNight) > this.dayMillis) ? true : false;