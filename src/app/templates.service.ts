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
export class TemplatesService {

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

  getTemplate(token, id) {
    return this.http.post<AnyResponse>('/api/templates/getbyid', {
      id
    }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token
        })
      });
  }

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

  createTemplate(token, name, type, notes) {
    const creator = JSON.parse(this.getCookie('user'))._id;
    return this.http.post<NormalResponse>('/api/templates/create', {
      name,
      type,
      notes,
      creator
    }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token
        })
      });
  }

  editTemplate(token, data) {
    return this.http.post<NormalResponse>('/api/templates/edit', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    });
  }

  deleteTemplate(token, data) {
    return this.http.post<NormalResponse>('/api/templates/delete', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    });
  }
}
