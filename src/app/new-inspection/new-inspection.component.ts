import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { InspectionsService } from '../inspections.service';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-new-inspection',
  templateUrl: './new-inspection.component.html',
  styleUrls: ['./new-inspection.component.css']
})
export class NewInspectionComponent implements OnInit {

  paymentCheckbox = false;
  service: null;
  servicesArray = [];
  newInspectionForm: FormGroup;
  momentRegex = /[0-9]{1,2}[\/][0-9]{1,2}[\/][0-9]{4}/;

  // tslint:disable-next-line:max-line-length
  constructor(private insf: FormBuilder, private matSnackBar: MatSnackBar, private inspectionsService: InspectionsService, private templatesService: TemplatesService) { }

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

  getTemplates() {
    this.templatesService.getTemplates(this.getCookie('access_token')).subscribe(res => {
      if (res.error) {
        this.matSnackBar.open('An unhandled exception occured', 'close');
      } else {
        this.servicesArray = res.message.map(s => {
          const usename = s.name.split(' ')[0] + ' Template';
          s.name = usename;
          return s;
        });
        console.log(this.servicesArray);
      }
    });
  }

  getCurrentTime() {
    const now = moment().format('LTS').replace(/\s/, '').replace('AM', '').replace('PM', '');
    let time = now.split(':');
    const timeMap = time.map(t => {
      const len = t.length;
      if (len === 1) {
        return '0' + t;
      } else {
        return t;
      }
    });
    const currentTime = timeMap[0] + ':' + timeMap[1] + ':' + timeMap[2];
    return currentTime;
  }

  ngOnInit() {
    this.getCurrentTime();
    this.newInspectionForm = this.insf.group({
      date: [moment().toDate(), [
        Validators.required
      ]],
      inspectionTime: ['', [
        Validators.required
      ]],
      inspectionDuration: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      zipcode: ['', [
        Validators.required
      ]],
      firstname: ['', [
        Validators.required
      ]],
      lastname: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      email2: ['', [
        Validators.required,
        Validators.email
      ]],
      checkPayment: [true],
      paymentnotes: [''],
      service: ['']
    });
    this.newInspectionForm.patchValue({ inspectionTime: this.getCurrentTime() });
    this.getTemplates();
  }

  toggleCheckbox() {
    this.paymentCheckbox = !(this.paymentCheckbox);
  }

  setService($e) {
    this.service = $e.value;
  }

  saveInspection() {
    if (this.newInspectionForm.valid) {
      this.matSnackBar.open('This option is currently unavailable', 'close'); return false;
      const val = this.newInspectionForm.value;
      val.checkPayment = this.paymentCheckbox;
      this.inspectionsService.createInspection(this.getCookie('access_token'), val).subscribe(res => {
        if (res.error) {
          this.matSnackBar.open('An unhandled exception occured', 'close');
        } else {
          this.matSnackBar.open('Your inspection has been saved', 'close');
        }
      });
    } else {
      this.matSnackBar.open('Please input all of the fields, correctly', 'close');
    }
  }
}
