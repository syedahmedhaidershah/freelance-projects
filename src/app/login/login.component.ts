import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public unamePattern = '^[a-zA-Z0-9]{2,}[^\s-]$';
  public passPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$';

  constructor(private lf: FormBuilder, private Auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.lf.group({
      username: ['', [
        Validators.required,
        Validators.pattern(this.unamePattern)
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(this.passPattern)
      ]]
    });
  }

  private setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async loginUser() {
    const formVal = this.loginForm.value;

    try {
      this.Auth.getUserDetails(formVal.username, formVal.password).subscribe(data => {
        if (!data.error) {
          this.Auth.setLoggedIn(true);
          $('.logoutbutton').addClass('active');
          this.setCookie('token', data.token, 1);
          this.setCookie('datetime', data.datetime, 1);
          this.router.navigate(['panel']);
        } else {
          window.alert(data.message);
          this.Auth.setLoggedIn(false);
          $('.logoutbutton').removeClass('active');
          this.router.navigate(['']);
        }
      });
    } catch (ex) {
      console.log('an error occured');
    }
  }

}
