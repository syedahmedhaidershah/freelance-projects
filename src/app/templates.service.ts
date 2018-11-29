import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface NormalResponse {
  error: boolean;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class TemplatesService {

  constructor(private http: HttpClient) { }

  getTemplates(token) {
    return this.http.post<NormalResponse>('/api/templates/getall', {}, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token
        })
    });
  }

  createTemplate(token, name, type, notes) {
    return this.http.post<NormalResponse>('/api/templates/create', {
      name,
      type,
      notes
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    });
  }
}
