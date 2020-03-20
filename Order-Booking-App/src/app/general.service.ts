import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  loadTime = 500;

  constructor() { }

  hideLoader() {
    document.getElementById('loader-container').classList.add('d-none');
  }

  unhideLoader() {
    document.getElementById('loader-container').classList.remove('d-none');
  }
}
