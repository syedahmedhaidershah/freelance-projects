import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ScratchTemplateComponent } from '../scratch-template/scratch-template.component';
import { ScratchSectionComponent } from '../scratch-section/scratch-section.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private matDialog: MatDialog) { }

  ngOnInit() {
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
