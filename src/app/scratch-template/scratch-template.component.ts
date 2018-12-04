import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TemplatesService } from '../templates.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-scratch-template',
  templateUrl: './scratch-template.component.html',
  styleUrls: ['./scratch-template.component.css']
})
export class ScratchTemplateComponent implements OnInit {

  newTemplateForm: FormGroup;

  public property = null;

  public propertyTypes = [
    { 'id': 'residential', 'name': 'Residential' },
    { 'id': 'commercial', 'name': 'Commercial' },
    { 'id': 'industrial', 'name': 'Industrial' },
    { 'id': 'office', 'name': 'Office' },
    { 'id': 'restaurant', 'name': 'Restaurant' },
    { 'id': 'retail', 'name': 'Retail' },
    { 'id': 'land', 'name': 'Land/Plot' },
  ];

  // tslint:disable-next-line:max-line-length
  constructor(private templatesService: TemplatesService, private tf: FormBuilder, private templateService: TemplatesService, private matSnackBar: MatSnackBar) { }

  public gebi(id) {
    return document.getElementById(id);
  }

  public gebiv(id) {
    const el = (<HTMLInputElement>document.getElementById(id));
    return el.value;
  }

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

  ngOnInit() {
    this.newTemplateForm = this.tf.group({
      templateName: ['', [
        Validators.required
      ]],
      type: ['', [
        Validators.required
      ]],
      notes: ['']
    });
  }

  setPropertyType($e) {
    this.property = $e.value;
  }

  pushNewTemplate() {
    const token = this.getCookie('access_token');
    const name = this.gebiv('templatename');
    const type = this.property;
    const notes = this.gebiv('notes');
    if (this.newTemplateForm.valid) {
      this.templateService.createTemplate(token, name, type, notes).subscribe(data => {
        if (data.error) {
          this.matSnackBar.open(data.message, 'close');
        } else {
          this.newTemplateForm.reset();
          this.matSnackBar.open(`Your template, '${name}', has been created.`, 'close');
        }
      });
    } else {
      this.matSnackBar.open('Please input all of the fields, correctly', 'close');
    }
  }

  get templateName() {
    return this.newTemplateForm.get('templateName');
  }

}
