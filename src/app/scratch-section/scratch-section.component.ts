import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SectionsService } from '../sections.service';
import { MatDialog } from '@angular/material/dialog';
import { IconsComponent } from '../icons/icons.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-scratch-section',
  templateUrl: './scratch-section.component.html',
  styleUrls: ['./scratch-section.component.css']
})
export class ScratchSectionComponent implements OnInit {

  public templatesArray = [];
  private templateId;
  private inclusion;
  private iconElement = null;
  private sectionIcon = null;

  public incluseionTypes = [
    { id: 'included', name: 'Included in every report' },
    { id: 'optional', name: 'Optional - add on per-report basis' }
  ];

  newSectionForm: FormGroup;

  public gebi(id) {
    const el = (<HTMLInputElement>document.getElementById(id));
    return el;
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

  private getTemplates() {
    this.sectionsSevice.getTemplates(this.getCookie('access_token')).subscribe(data => {
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

  private setTemplateName($e) {
    this.templateId = $e.value;
  }

  private setInclusion($e) {
    this.inclusion = $e.value;
  }

  // tslint:disable-next-line:max-line-length
  constructor(private sectionsSevice: SectionsService, private sf: FormBuilder, private matDialog: MatDialog, private matSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.newSectionForm = this.sf.group({
      sectionName: ['', [
        Validators.required
      ]],
      templateName: ['', [
        Validators.required
      ]],
      inclusion: ['', [
        Validators.required
      ]],
      icon: [''],
      standards: [''],
      reminders: ['']
    });
    this.getTemplates();
    this.setElements();
  }

  setElements() {
    this.iconElement = this.gebi('icon');
  }

  chooseIcon() {
    const dialogRef = this.matDialog.open(IconsComponent, {
      height: '30%',
      width: '70%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sectionIcon = result;
        // this.iconElement.value = result.toUpperCase();
        this.newSectionForm.controls['icon'].setValue(result.toUpperCase());
      }
    });
  }

  private pushNewSection() {
    if (this.newSectionForm.valid) {
      const val = this.newSectionForm.value;
      this.sectionsSevice.createService(this.getCookie('access_token'), val).subscribe((data) => {
        if (!data.error) {
          this.newSectionForm.reset();
          this.matSnackBar.open('Your section has been saved', 'close');
        } else {
          this.matSnackBar.open('An error occured while saving the new section', 'close');
        }
      });
    }
  }

}
