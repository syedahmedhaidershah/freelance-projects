import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-iterations-dialog',
  templateUrl: './iterations-dialog.component.html',
  styleUrls: ['./iterations-dialog.component.css']
})
export class IterationsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<IterationsDialogComponent>
  ) { }

  ngOnInit(): void {
    this.setAttr();
  }

  setAttr = () => {
    this.data.message = this.data.message.toUpperCase();
  }

  close = this.ref.close;

}
