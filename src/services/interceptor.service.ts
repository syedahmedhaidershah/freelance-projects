import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isDevMode } from '@angular/core';
import { environment as env } from '../environments/environment';
// import { environment as prodEnv } from '../environments/environment.prod';
// import { environment as uatEnv } from '../environments/environment.uat';

export class AppComponent {
  constructor() {
  }
}
import { MessagesService } from './messages.service';
import { StateService } from './state.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  optOutLoader = [
    'getgradablexamlist',
    'markRead'
  ];

  private totalRequests = 0; // changes

  constructor(
    private messages: MessagesService,
    private snackbar: MatSnackBar,
    private state: StateService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const routeToOpt = this.optOutLoader.includes(req.url.split('/')[1]);

    if (!routeToOpt) this.totalRequests++; // changes

    if (req.url) {

      const apiUrl = env.apiPaths[0];

      const duplicate = req.clone(
        {
          url: apiUrl.concat(req.url),
          headers: req.headers.set('Authorization', this.state.get('access_jwt'))
        }
      );
      if (!routeToOpt) this.messages.activateLoader();
      return next.handle(duplicate)
        .pipe(
          tap(res => {
            if (res instanceof HttpResponse) {
              if (!routeToOpt) this.decreaseRequests();
            }
          }),
          retry(1),
          catchError((error: HttpErrorResponse) => {
            try {
              console.log(error.error);
              let errorMessage = '';
              if (error.error instanceof ErrorEvent) {
                // client-side error
                errorMessage = `Error: ${error.error.message}`;
              } else {
                // server-side error
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
              }
              this.snackbar.open('Error connecting to the server', 'close')._dismissAfter(5000);
              if ((error.error.error && error.error.message.toLowerCase() === 'jwt expired') || error.status === 403) {
                this.snackbar.open('Session expired, kindly login again.', 'close')._dismissAfter(5000)
                this.messages.changeMessage('non-static-logout');
              }
              this.decreaseRequests();
              return throwError(errorMessage);
            } catch (exc) {
              if(isDevMode()) console.warn(exc);
              return throwError(exc);
            }
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
          if (error.error.error && error.error.message.toLowerCase() === 'jwt expired') {
            this.snackbar.open('Session expired, kindly login again.', 'close')._dismissAfter(3000)
            this.messages.changeMessage('non-static-logout');
          }
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
