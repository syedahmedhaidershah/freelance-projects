import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSelect, MatDialogRef, MatSnackBar } from '@angular/material';
import { AllotteesService } from '../allottees.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-switch-file',
  templateUrl: './switch-file.component.html',
  styleUrls: ['./switch-file.component.css']
})
export class SwitchFileComponent implements OnInit {

  fileVal: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private allottees: AllotteesService,
    private ref: MatDialogRef<SwitchFileComponent>,
    private snackBar: MatSnackBar,
    private message: MessagesService
  ) { }

  ngOnInit() {
    this.initForms();
    this.fileVal = this.data.file.aid;
  }

  initForms() {
  }

  getNewFile(s: MatSelect) {
    this.fileVal = s.value;
  }

  switchPlot($e) {
    $e.preventDefault();
    this.allottees.changePlotOnFile({
      file: this.data.file,
      newVal: this.fileVal
    }).subscribe(res => {
      this.snackBar.open(res.message, 'close');
      this.message.changeMessage('files');
      if (res.error === false) {
        this.ref.close();
      }
    });
  }

}
