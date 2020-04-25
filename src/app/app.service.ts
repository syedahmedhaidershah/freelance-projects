import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  login = (creds: any) => {
    // Remove From here ///////////////////////////////////////////////
    if (isDevMode()) {
      return of({
        error: false,
        message: 'success'
      });
    } else {
      return this.http.post<any>('login', creds); // leave this line
    }
    // To here ///////////////////////////////////////////////
  }
}
