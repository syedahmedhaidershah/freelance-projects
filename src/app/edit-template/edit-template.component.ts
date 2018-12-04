import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.css']
})
export class EditTemplateComponent implements OnInit {

  private data = null;

  public propertyTypes = [
    { 'id': 'residential', 'name': 'Residential' },
    { 'id': 'commercial', 'name': 'Commercial' },
    { 'id': 'industrial', 'name': 'Industrial' },
    { 'id': 'office', 'name': 'Office' },
    { 'id': 'restaurant', 'name': 'Restaurant' },
    { 'id': 'retail', 'name': 'Retail' },
    { 'id': 'land', 'name': 'Land/Plot' },
  ];

  editTemplateForm: FormGroup;

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

  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: any, private templatesService: TemplatesService, private tf: FormBuilder, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.data = this.injectedData;
    this.editTemplateForm = this.tf.group({
      name: [''],
      type: [''],
      notes: ['']
    });
    this.templatesService.getTemplate(this.getCookie('access_token'), this.data).subscribe(data => {
      console.log(data.message);
      this.editTemplateForm.patchValue({
        name: data.message.name,
        type: data.message.type,
        notes: data.message.notes
      });
    });
  }

  editTemplate() {
    const val = this.editTemplateForm.value;
    val._id = this.data;
    this.templatesService.editTemplate(this.getCookie('access_token'), val).subscribe(res => {
      if (res.error) {
        this.matSnackBar.open('An unhandled exception occured', 'close');
      } else {
        this.matSnackBar.open('Your template has been edited', 'close');
      }
    });
  }

}
