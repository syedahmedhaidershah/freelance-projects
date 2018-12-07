import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface NormalResponse {
  error: boolean;
  message: string;
}

interface ArrayResponse {
  error: boolean;
  message: Array<any>;
}

interface AnyResponse {
  error: boolean;
  message: any;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  constructor(private http: HttpClient) { }

  getClients(token) {
    const user = JSON.parse(this.getCookie('user'))._id;
    return this.http.post<AnyResponse>('/api/clients/getall', {
      user
    }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token
        })
      });
  }
}
