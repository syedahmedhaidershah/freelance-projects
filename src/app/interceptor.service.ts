import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MessagesService } from './messages.service';
import { environment as devEnv } from '../environments/environment';
import { environment as prodEnv } from '../environments/environment.prod';
import { isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private totalRequests = 0; // changes

  constructor(
    private messages: MessagesService,
    private snackbar: MatSnackBar
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.totalRequests++; // changes
    if (req.url) {

      const apiUrl = (isDevMode()) ? devEnv.apiPaths[0] : prodEnv.apiPaths[0];

      const duplicate = req.clone(
        {
          url: apiUrl.concat(req.url),
          headers: new HttpHeaders({
            isStudent: 'true',
            // Authorization: localStorage.getItem('access_jwt')
          })
          // headers: req.headers.set('Authorization', localStorage.getItem('access_jwt'))
        }
      );
      if (!localStorage.bypassLoaderAud && !localStorage.bypassLoaderCam) {
        this.messages.activateLoader();
      }
      return next.handle(duplicate)
        .pipe(
          tap(res => {
            if (res instanceof HttpResponse) {
              this.decreaseRequests();
            }
          }),
          retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              errorMessage = `Error: ${error.error.message}`;
            } else {
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            this.snackbar.open('Error connecting to the server', 'close')._dismissAfter(3000);
            this.decreaseRequests();
            return throwError(errorMessage);
          })
        );
    }
    this.messages.activateLoader();
    return next.handle(req)
      .pipe(
        tap(res => {
          if (res instanceof HttpResponse) {
            this.decreaseRequests();
          }
        }),
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          this.snackbar.open('Error connecting to the server', 'close')._dismissAfter(3000);
          this.decreaseRequests();
          return throwError(errorMessage);
        })
      );
  }
  // changes
  private decreaseRequests() {
    this.totalRequests--;
    if (this.totalRequests === 0) {
      this.messages.removeLoader();
    }
  }
}
