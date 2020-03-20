import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Objres } from './objres';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient
  ) { }

  placeOrder = (data: object) => this.http.post<Objres>('/orders/placeorder', data);
}
