import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ScratchTemplateComponent } from '../scratch-template/scratch-template.component';

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
    switch (b._document.activeElement.id) {
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

}
