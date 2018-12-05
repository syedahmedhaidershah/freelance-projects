import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ScratchTemplateComponent } from '../scratch-template/scratch-template.component';
import { ScratchSectionComponent } from '../scratch-section/scratch-section.component';
import { TemplatesService } from '../templates.service';
import { SectionsService } from '../sections.service';
import { ScratchItemComponent } from '../scratch-item/scratch-item.component';
import { ItemsService } from '../items.service';
import { EditTemplateComponent } from '../edit-template/edit-template.component';
import { EditSectionComponent } from '../edit-section/edit-section.component';
import { ScratchCommentComponent } from '../scratch-comment/scratch-comment.component';
import { CommentsService } from '../comments.service';
import { ViewTemplateComponent } from '../view-template/view-template.component';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  public templatesArray = [];
  public sectionsArray = [];
  public itemsArray = [];
  public commentsArray = [];

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
  constructor(private snackBar: MatSnackBar, private matDialog: MatDialog, private templateService: TemplatesService, private sectionsService: SectionsService, private itemsService: ItemsService, private commentsService: CommentsService) { }

  ngOnInit() {
    this.getTemplates();
    this.getSections();
    this.getItems();
    this.getComments();
  }

  public capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private getTemplates() {
    this.templateService.getTemplates(this.getCookie('access_token')).subscribe(data => {
      if (data.error) {
        const message = data.message.toString() || String(data.message);
        this.snackBar.open(message, 'close');
      } else {
        data.message.forEach((template) => {
          this.templatesArray.push(template);
        });
      }
    });
  }

  private getSections() {
    this.sectionsService.getSections(this.getCookie('access_token')).subscribe(data => {
      if (data.error) {
        const message = data.message.toString() || String(data.message);
        this.snackBar.open(message, 'close');
      } else {
        data.message.forEach((section) => {
          this.sectionsArray.push(section);
        });
      }
    });
  }

  private getItems() {
    this.itemsService.getItems(this.getCookie('access_token')).subscribe(data => {
      if (data.error) {
        const message = data.message.toString() || String(data.message);
        this.snackBar.open(message, 'close');
      } else {
        data.message.forEach((item) => {
          this.itemsArray.push(item);
        });
      }
    });
  }

  private getComments() {
    this.commentsService.getComments(this.getCookie('access_token')).subscribe(data => {
      if (data.error) {
        const message = data.message.toString() || String(data.message);
        this.snackBar.open(message, 'close');
      } else {
        data.message.forEach((comment) => {
          this.commentsArray.push(comment);
        });
      }
    });
  }

  private createTemplate(b) {
    const useId = b._document.activeElement.id.split(/[A-Z]{1}/g)[0];
    switch (useId) {
      case 'scratch':
        const dialogRef = this.matDialog.open(ScratchTemplateComponent, {
          height: (window.innerHeight - 100).toString() + 'px',
          width: (window.innerWidth - 100).toString() + 'px',
        });
        break;
      default:
        this.snackBar.open('This option is currently unavailable.', 'close');
        break;
    }
  }

  private createSection(b) {
    const useId = b._document.activeElement.id.split(/[A-Z]{1}/g)[0];
    switch (useId) {
      case 'scratch':
        const dialogRef = this.matDialog.open(ScratchSectionComponent, {
          height: (window.innerHeight - 100).toString() + 'px',
          width: (window.innerWidth - 100).toString() + 'px',
        });
        break;
      default:
        this.snackBar.open('This option is currently unavailable.', 'close');
        break;
    }
  }

  private createItem(b) {
    const useId = b._document.activeElement.id.split(/[A-Z]{1}/g)[0];
    switch (useId) {
      case 'scratch':
        const dialogRef = this.matDialog.open(ScratchItemComponent, {
          height: (window.innerHeight - 100).toString() + 'px',
          width: (window.innerWidth - 100).toString() + 'px',
        });
        break;
      default:
        this.snackBar.open('This option is currently unavailable.', 'close');
        break;
    }
  }

  private createComment(b) {
    const useId = b._document.activeElement.id.split(/[A-Z]{1}/g)[0];
    switch (useId) {
      case 'scratch':
        const dialogRef = this.matDialog.open(ScratchCommentComponent, {
          height: (window.innerHeight - 100).toString() + 'px',
          width: (window.innerWidth - 100).toString() + 'px',
        });
        break;
      default:
        this.snackBar.open('This option is currently unavailable.', 'close');
        break;
    }
  }

  editTemplate(id) {
    const dialogRef = this.matDialog.open(EditTemplateComponent, {
      height: (window.innerHeight - 100).toString() + 'px',
      width: (window.innerWidth - 100).toString() + 'px',
      data: id
    });
  }

  deleteTemplate(id) {
    this.templateService.deleteTemplate(this.getCookie('access_token'), {_id: id}).subscribe(res => {
      if (res.error) {
        this.snackBar.open('An unhandled exception occured', 'close');
      } else {
        this.snackBar.open('Your template has been deleted along with sub-sections & items', 'close');
      }
    });
  }

  editSection(id) {
    const dialogRef = this.matDialog.open(EditSectionComponent, {
      height: (window.innerHeight - 100).toString() + 'px',
      width: (window.innerWidth - 100).toString() + 'px',
      data: id
    });
  }

  deleteSection(id) {
    this.sectionsService.deleteSection(this.getCookie('access_token'), { _id: id }).subscribe(res => {
      if (res.error) {
        this.snackBar.open('An unhandled exception occured', 'close');
      } else {
        this.snackBar.open('Your template has been deleted along with sub-sections & items', 'close');
      }
    });
  }

  editItem(id) {
    const dialogRef = this.matDialog.open(EditItemComponent, {
      height: (window.innerHeight - 100).toString() + 'px',
      width: (window.innerWidth - 100).toString() + 'px',
      data: id
    });
  }

  deleteItem(id) {
    this.itemsService.deleteItem(this.getCookie('access_token'), { _id: id }).subscribe(res => {
      if (res.error) {
        this.snackBar.open('An unhandled exception occured', 'close');
      } else {
        this.snackBar.open('Your template has been deleted along with sub-sections & items', 'close');
      }
    });
  }

  viewTemplate(id) {
    const dialogRef = this.matDialog.open(ViewTemplateComponent, {
      height: (window.innerHeight - 40).toString() + 'px',
      width: (window.innerWidth - 40).toString() + 'px',
      data: id,
      panelClass: 'custom-dialog-container'
    });
  }

}
