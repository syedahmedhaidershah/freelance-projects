import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  unamePattern = '^[a-zA-Z]{2,}[^\s-]$';
  passPattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,24}$';
  phonePattern1 = '[0-9]{11}';
  phonePattern2 = '[+]{1}[0-9]{12}';

  constructor(private rf: FormBuilder, private reg: RegisterService, private router: Router, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.rf.group({
      firstname: ['', [
        Validators.required,
        Validators.pattern(this.unamePattern)
      ]],
      lastname: ['', [
        Validators.required,
        Validators.pattern(this.unamePattern)
      ]],
      company: '',
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        // Validators.pattern(this.phonePattern1),
        Validators.pattern(this.phonePattern2),
      ]],
      affiliation: '',
      password: ['', [
        Validators.required,
        Validators.pattern(this.passPattern)
      ]]
    });
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  async registerInspector() {

    const formval = this.registerForm.value;

    try {
      // tslint:disable-next-line:max-line-length
      this.reg.registerUser(formval.firstname, formval.lastname, formval.company, formval.email, formval.phone, formval.affiliation, formval.password).subscribe((data) => {
        try {
          if (!data.error) {
            const alertMsg = 'Congratulations, you have successfully registered as an Inspector. Login to access your dashboard.';
            this.router.navigate(['login'], { queryParams: { alert: encodeURIComponent(alertMsg) }});
          } else {
            this.matSnackBar.open(data.message, 'close');
          }
        } catch (ex) {
          this.matSnackBar.open('An unhandled exception occured', 'close');
          console.log(ex);
        }
      });
    } catch (ex) {
      console.log('an error occured');
    }

  }

}
