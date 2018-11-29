import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-scratch-template',
  templateUrl: './scratch-template.component.html',
  styleUrls: ['./scratch-template.component.css']
})
export class ScratchTemplateComponent implements OnInit {

  newTemplateForm: FormGroup;

  public propertyTypes = [
    { 'id': 'residential', 'name': 'Residential' },
    { 'id': 'commercial', 'name': 'Commercial' },
    { 'id': 'industrial', 'name': 'Industrial' },
    { 'id': 'office', 'name': 'Office' },
    { 'id': 'restaurant', 'name': 'Restaurant' },
    { 'id': 'retail', 'name': 'Retail' },
    { 'id': 'land', 'name': 'Land/Plot' },
  ];

  constructor(private templatesService: TemplatesService, private tf: FormBuilder, private templateService: TemplatesService) { }

  public gebi(id) {
    return document.getElementById(id);
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

  pushNewTemplate() {
    const token = this.getCookie('access_token');
    const name = this.gebi('templatename').value;
    const type = this.gebi('property').value;
    const notes = this.gebi('notes').value;
    this.templateService.createTemplate(token, name, type, notes).subscribe(data => {
      if (data.error) {
        window.alert(data.message);
      } else {
        console.log(data);
      }
    });
  }

  get templateName() {
    return this.newTemplateForm.get('templateName');
  }

}
