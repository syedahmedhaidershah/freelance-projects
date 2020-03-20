import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameRegex = /[A-Za-z0-9]{0,6}/i;
  passwordRegex = /[A-Za-z0-9.!]{0,16}/i;

  login: FormGroup;

  constructor(
    private fb: FormBuilder,
    private users: UsersService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.initForms();
    this.setListeners();
  }

  initForms() {
    this.login = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern(this.usernameRegex),
        Validators.maxLength(6),
        Validators.minLength(6),
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
        Validators.minLength(8),
        Validators.maxLength(16)
      ]],
    });
  }

  setListeners() {
  }

  loginToPanel() {
    if (this.login.invalid) {
      this.snackbar.open('Please input all of the fields correctly', 'close').afterOpened().subscribe(sub => {
        this.snackbar.dismiss();
      });
    } else {
      const val = this.login.value;
      if (val.username === 'admin1' && val.password === 'admin123') {
        this.router.navigate(['panel']);
      } else {
        this.snackbar.open('Invalid credentials', 'close').afterOpened().subscribe(sub => {
          this.snackbar.dismiss();
        });
      }
    }
  }

}
