import { Injectable, OnDestroy } from '@angular/core';
import { GoogleAuthService } from 'ng-gapi';
import { MessagesService } from './messages.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GoogService implements OnDestroy {
  public static SESSION_STORAGE_KEY = 'accessToken';

  private unsubscribe = new Subject();
  private user: any;

  constructor(
    private googleAuth: GoogleAuthService,
    private messages: MessagesService,
    private snackbar: MatSnackBar
  ) { }


  public getToken(): string {
    const token: string = sessionStorage.getItem(GoogService.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set , authentication required');
    }
    return sessionStorage.getItem(GoogService.SESSION_STORAGE_KEY);
  }

  public signIn(): void {
    // const authSub =
    this.googleAuth.getAuth().pipe(takeUntil(this.unsubscribe))
      .subscribe((auth) => {
        // tslint:disable-next-line: max-line-length
        auth.signIn()
          .then((res: any) => this.signInSuccessHandler(res))
          .catch(
            (exc: any) => this.snackbar.open(
              'An error occured connecting to the server', 'close'
            )._dismissAfter(3000)
          );
        // authSub.unsubscribe();
      });
  }

  private signInSuccessHandler(res: any) {
    this.user = res;
    localStorage.setItem('access_token', res.getAuthResponse().access_token);
    sessionStorage.setItem(
      GoogService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
    );

    const x = new XMLHttpRequest();
    // tslint:disable-next-line: max-line-length
    x.open('GET', 'https://classroom.googleapis.com/v1/userProfiles/'.concat(this.user.El).concat('?access_token=').concat(
      sessionStorage.getItem(GoogService.SESSION_STORAGE_KEY)
    ), true);
    x.onreadystatechange = () => {
      if (x.readyState === 4 && x.status === 200) {
        if (x.response) {
          this.messages.changeObject({ topic: 'user-authenticated', message: x.response });
        }
      }
    }
    x.send();

  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
