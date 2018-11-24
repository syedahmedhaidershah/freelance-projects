import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  private setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  async logUserOut() {
    const cleared = await function() {
      this.auth.setLoggedIn(false);
      this.setCookie('access_token', null, 0);
      this.setCookie('user', null, 0);
      return true;
    };
    this.router.navigate(['']);
    window.location.reload();
    return cleared;
  }
}
