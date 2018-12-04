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
export class SectionsService {

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

  getTemplates(token) {
    return this.http.post<ArrayResponse>('/api/templates/getall', {
      creator: JSON.parse(this.getCookie('user'))._id
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    });
  }

  getSection(token, id) {
    return this.http.post<AnyResponse>('/api/sections/getbyid', {
      id
    }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token
        })
      });
  }

  getSections(token) {
    return this.http.post<ArrayResponse>('/api/sections/getall', {
      creator: JSON.parse(this.getCookie('user'))._id
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    });
  }

  createService(token, secData) {
    secData.creator = JSON.parse(this.getCookie('user'))._id;
    return this.http.post<NormalResponse>('/api/sections/create', secData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    });
  }

  editSection(token, data) {
    return this.http.post<NormalResponse>('/api/sections/edit', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    });
  }

  deleteSection(token, data) {
    return this.http.post<NormalResponse>('/api/sections/delete', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    });
  }

}
