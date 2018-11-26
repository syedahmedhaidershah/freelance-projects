import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router, private cookieService: CookieService) { }

  logUserOut() {
    // await function () {
      this.auth.setLoggedIn(false);
      this.cookieService.set('access_token', null, 0);
      this.cookieService.set('user', null, 0);
      // location.reload();
      this.router.navigate(['']);
      window.location.reload();
      return true;
    // };
    // return cleared;
  }
}
