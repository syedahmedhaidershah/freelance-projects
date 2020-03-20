import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface Message {
  head: string;
  message: string;
}

@Component({
  selector: 'app-discard-dialog',
  templateUrl: './discard-dialog.component.html',
  styleUrls: ['./discard-dialog.component.css']
})
export class DiscardDialogComponent implements OnInit {

  constructor(
    private ref: MatDialogRef<DiscardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message
  ) { }

  ngOnInit() {
  }

  close(msg: boolean) {
    this.ref.close(msg);
  }

}
