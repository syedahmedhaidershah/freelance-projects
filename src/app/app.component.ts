import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user = null;

  private getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

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

  goToHome() {
    this.router.navigate(['']);
  }

  ngOnInit() {
    try {
      this.user = JSON.parse(this.getCookie('user'));
    } catch (exc) {
      this.user = null;
    }
  }

  gotoNewInspection() {
    this.router.navigate(['new-inspection']);
  }

  gotoDashboard() {
    this.router.navigate(['dashboard']);
  }

  gotoInspections() {
    this.router.navigate(['inspections']);
  }

  gotoTemplatesEditor() {
    this.router.navigate(['templates']);
  }

  gotoContacts() {
    this.router.navigate(['contacts']);
  }

  gotoMetrics() {
    this.router.navigate(['metrics']);
  }

}
