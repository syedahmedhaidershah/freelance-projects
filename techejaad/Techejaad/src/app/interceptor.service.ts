import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MessagesService } from './messages.service';

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

      // const apiUrl = 'http://192.168.0.107:4040';
      // const apiUrl = 'http://localhost:9899';
      const apiUrl = 'http://ec2-18-222-122-101.us-east-2.compute.amazonaws.com:9899';

      const duplicate = req.clone(
        {
          url: apiUrl.concat(req.url),
          headers: req.headers.set('Authorization', localStorage.getItem('access_jwt'))
        }
      );
      this.messages.activateLoader();
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
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            this.snackbar.open('Error connecting to the server', 'close')._dismissAfter(3000);
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
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          this.snackbar.open('Error connecting to the server', 'close')._dismissAfter(3000);
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
