import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objres } from './objres';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll = () => this.http.post<Objres>('/items/getall', {});
  // }
}
