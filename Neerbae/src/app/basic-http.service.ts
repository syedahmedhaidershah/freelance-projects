import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class BasicHttpService {

  constructor(
    private http: HttpClient
  ) { }
}
