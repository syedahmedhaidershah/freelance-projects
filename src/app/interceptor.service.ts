import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url) {
      // let useUrl = null;
      // try {
      //   useUrl = environment.zones[environment.selectedZone];
      // } catch (exc) {
      const apiUrl = 'http://localhost:9899/api';
      // }
      const duplicate = req.clone({ url: apiUrl.concat(req.url) });
      return next.handle(duplicate);
    }
    return next.handle(req);
  }
}
