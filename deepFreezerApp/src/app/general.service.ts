import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  loadTime = 500;

  constructor(
    private http: HttpClient
  ) { }

  hideLoader() {
    document.getElementById('loader-container').classList.add('d-none');
  }

  unhideLoader() {
    document.getElementById('loader-container').classList.remove('d-none');
  }

  getState() {
    return this.http.post<any>('/', {});
  }

  trigger() {
    return this.http.post<any>('/trigger', {});
  }
}
