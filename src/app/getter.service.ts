import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AnyResponse {
  error: boolean;
  message: any;
}

@Injectable({
  providedIn: 'root'
})
export class GetterService {

  constructor(private http: HttpClient) { }

  getRecentVoltages(limit: number) {
    return this.http.post<AnyResponse>('/get/voltage/recent/', {
      limit
    });
  }
}
