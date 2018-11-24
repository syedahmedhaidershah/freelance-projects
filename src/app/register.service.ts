import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface NormalResponse {
  error: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(Firstname, Lastname, Company, Email, Phone, Affiliation, Password) {
    return this.http.post<NormalResponse>('/api/inspector/signup', {
      Firstname,
      Lastname,
      Company,
      Email,
      Phone,
      Affiliation,
      Password
    });
  }
}
