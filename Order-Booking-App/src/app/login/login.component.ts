import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';

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
    private users: UsersService
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

}
