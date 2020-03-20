import { Injectable } from '@angular/core';
import { ArrObjRes } from './arr-obj-res';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.post<any>('notification/getAll',{});
  }
  markRead(id) {
    return this.http.post<any>('notification/markRead',{notificationId:id});
  }
}
