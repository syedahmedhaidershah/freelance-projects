import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isLoggedIn) {
      $('.authorized-links').addClass('d-none');
      $('.authorization-links').removeClass('d-none');
      this.router.navigate(['login']);
    } else {
      $('.authorization-links').addClass('d-none');
      $('.authorized-links').removeClass('d-none');
    }
      return this.auth.isLoggedIn;
  }
}
