import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SectionsService } from '../sections.service';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.css']
})
export class EditSectionComponent implements OnInit {

  private data = null;
  public templatesArray = [];

  public incluseionTypes = [
    { id: 'included', name: 'Included in every report' },
    { id: 'optional', name: 'Optional - add on per-report basis' }
  ];

  editSectionForm: FormGroup;

  private getTemplates() {
    this.sectionsService.getTemplates(this.getCookie('access_token')).subscribe(data => {
      if (data.error) {
        const message = data.message.toString() || String(data.message);
        this.matSnackBar.open(message, 'close');
      } else {
        data.message.forEach((template) => {
          this.templatesArray.push(template);
        });
      }
    });
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

  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: any, private sectionsService: SectionsService, private sf: FormBuilder, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.data = this.injectedData;
    this.editSectionForm = this.sf.group({
      sectionName: [''],
      templateName: [''],
      inclusion: [''],
      icon: [''],
      standards: [''],
      reminders: ['']
    });
    this.getTemplates();
    this.sectionsService.getSection(this.getCookie('access_token'), this.data).subscribe(data => {
      this.editSectionForm.patchValue({
        sectionName: data.message.sectionName,
        templateName: data.message.templateId,
        inclusion: data.message.inclusion,
        icon: data.message.icon,
        standards: data.message.standards,
        reminders: data.message.reminders
      });
    });
  }

  editSection() {
    let val = this.editSectionForm.value;
    const tid = val.templateName;
    val.templateId = tid;
    this.templatesArray.map((t) => {
      if (t._id === tid) {
        val.templateName = t.name;
      }
    });
    val._id = this.data;
    this.sectionsService.editSection(this.getCookie('access_token'), val).subscribe(res => {
      if (res.error) {
        this.matSnackBar.open('An unhandled exception occured', 'close');
      } else {
        this.matSnackBar.open('Your section has been edited', 'close');
      }
    });
  }

}
