import { Component, OnInit, isDevMode } from '@angular/core';
import { AppService } from '../app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  prompts = {
    loginEmpty: 'Please input all of the required fields',
    loginFailed: 'An unhandled exception occured. Kindly contact support',
    loginSuccess: 'Welcome'
  }

  loginForm: FormGroup;

  constructor(
    private app: AppService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router,
    private messages: MessagesService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    if (this.auth.isAuthenticated) {
      this.messages.activateLoader();
      this.router.navigate(['dashboard'])
        .then(
          fullfilled => {
            this.snackbar.open('Login successful', 'close')._dismissAfter(1500);
          }
        )
        .catch(
          exc => {
            this.snackbar.open('An error occured logging you in.', 'close')
              ._dismissAfter(3000);
          });
    }
    this.initForms();
    this.loadState();
  }

  initForms = () => {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loadState = () => {
    this.messages.loadedState([
      this.constructor.name.split('Component')[0].toLowerCase()
    ]);
  }

  login = async () => {
    if (this.loginForm.invalid) {
      this.snackbar.open(
        this.prompts.loginEmpty
        , 'close', { duration: 3000 });
    } else {
      const useVal = this.loginForm.value;

      const loggedIn = await this.app.login(useVal).toPromise();

      if (loggedIn.error || loggedIn instanceof Error) {
        try {
          this.snackbar.open(
            loggedIn.message
            , 'close', { duration: 3000 });
        } catch (exc) {
          this.snackbar.open(
            this.prompts.loginFailed
            , 'close', { duration: 3000 });

          if (isDevMode()) console.log(exc)
        }
      } else {
        const { username } = useVal;

        localStorage.setItem('TEMP_USER_PROF', JSON.stringify({ username }));
        const routed = await this.router.navigate(['dashboard']);
        if (routed) {
          this.snackbar.open(
            this.prompts.loginSuccess
            , 'close', { duration: 3000 });
        }
      }
    }
  }

}
