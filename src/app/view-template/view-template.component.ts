import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TemplatesService } from '../templates.service';
import { SectionsService } from '../sections.service';
import { ItemsService } from '../items.service';
import { CommentsService } from '../comments.service';
import { EditSectionComponent } from '../edit-section/edit-section.component';

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.css']
})
export class ViewTemplateComponent implements OnInit {

  public data = null;
  public template = null;
  public section = false;
  sectionsArray = [];
  itemsArray = [];

  // tslint:disable-next-line:max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: any, private sf: FormBuilder, private matSnackBar: MatSnackBar, private templatesService: TemplatesService, private sectionsService: SectionsService, private itemsService: ItemsService, private commentsService: CommentsService, private matDialog: MatDialog) { }

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

  public capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getTemplate() {
    this.templatesService.getTemplate(this.getCookie('access_token'), this.data).subscribe(res => {
      if (res.error) {
        this.matSnackBar.open('An unhandled exception occured', 'close');
      } else {
        this.template = res.message;
      }
    });
  }

  getSections() {
    this.sectionsService.getSectionsByTemplate(this.getCookie('access_token'), this.data).subscribe(res => {
      if (res.error) {
        this.matSnackBar.open('An unhandled exception occured', 'close');
      } else {
        this.sectionsArray = res.message;
      }
    });
  }

  ngOnInit() {
    this.data = this.injectedData;
    this.getTemplate();
    this.getSections();
  }

  editSection(id) {
    const sectionDialogRef = this.matDialog.open(EditSectionComponent, {
      height: (window.innerHeight - 100).toString() + 'px',
      width: (window.innerWidth - 100).toString() + 'px',
      data: id
    });
  }
}
