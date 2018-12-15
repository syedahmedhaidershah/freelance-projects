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
export class InappService {

  constructor(private http: HttpClient) { }

  checkForToken(value, datetime) {
    return this.http.post<TokenData>('/api/verifytoken', {
      value,
      datetime
    });
  }

  getNotifications(value, datetime) {
    return this.http.post<CommonData>('/api/notifications', {
      value,
      datetime
    });
  }

  pushNotification(value, datetime, announcement, body) {
    return this.http.post<CommonData>('/api/pushannouncement', {
      value,
      datetime,
      announcement,
      body
    });
  }

  deleteNotification(value, datetime, _id) {
    return this.http.post<CommonData>('/api/delannouncement', {
      value,
      datetime,
      _id
    });
  }

  editNotification(value, datetime, _id, announcement, body) {
    return this.http.post<CommonData>('/api/editannouncement', {
      value,
      datetime,
      _id,
      announcement,
      body
    });
  }

  retreiveNotification(value, datetime, _id) {
    return this.http.post<CommonData>('/api/retreivenotification', {
      value,
      datetime,
      _id
    });
  }

  pushCarousel(name, image, value, datetime) {
    return this.http.post<CommonData>('/api/pushcarousel', {
      name,
      image,
      value,
      datetime
    });
  }

  retreiveCarousels(value, datetime) {
    return this.http.post<CommonData>('/api/getcarousels', {
      value,
      datetime
    });
  }

  deleteCarousel(value, datetime, id) {
    return this.http.post<CommonData>('/api/deletecarousel', {
      value,
      datetime,
      id
    });
  }
}
