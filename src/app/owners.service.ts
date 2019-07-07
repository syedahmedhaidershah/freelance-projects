import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  constructor(
    private http: HttpClient
  ) { }

  get(data) {
    return this.http.post<any>('/owners/getprev', data);
  }
}
