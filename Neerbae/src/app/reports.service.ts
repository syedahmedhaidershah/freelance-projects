import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArrObjRes } from './arr-obj-res';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.post<any>('report/getAll', {});
  }
}
