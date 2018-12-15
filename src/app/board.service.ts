import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface TokenData {
  error: boolean;
  message: any;
}

interface CommonData {
  error: boolean;
  message: any;
}


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  getToken() {
    return this.http.post<CommonData>('/api/gettokenforboard', {});
  }
}
