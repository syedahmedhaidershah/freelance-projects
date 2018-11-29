import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ScratchTemplateComponent } from '../scratch-template/scratch-template.component';
import { ScratchSectionComponent } from '../scratch-section/scratch-section.component';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  public templatesArray = [];

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

  constructor(private snackBar: MatSnackBar, private matDialog: MatDialog, private templateService: TemplatesService) { }

  ngOnInit() {
    this.getTemplates();
  }

  private getTemplates() {
    this.templateService.getTemplates( this.getCookie('access_token') ).subscribe(data => {
      if(data.error) {
        window.alert(data.message);
      } else {
        data.message.fo
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

}
