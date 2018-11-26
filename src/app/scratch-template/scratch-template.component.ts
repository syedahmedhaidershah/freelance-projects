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

  constructor(private templatesService: TemplatesService, private tf: FormBuilder) { }

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


  get templateName() {
    return this.newTemplateForm.get('templateName');
  }

}
