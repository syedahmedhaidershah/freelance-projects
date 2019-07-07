import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-transfer-doc',
  templateUrl: './transfer-doc.component.html',
  styleUrls: ['./transfer-doc.component.css']
})
export class TransferDocComponent implements OnInit {

  constructor(
    private ref: MatDialogRef<TransferDocComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

  close() {
    this.ref.close();
  }

  print() {
    window.print();
  }

  get getYear() {
    return new Date().getFullYear();
  }

  getDate(d: string) {
    return new Date(d).toLocaleString().split(',')[0];
  }

  getSize(str: string) {
    console.log(str);
    const c = str.toLowerCase();

    let ret = 0;

    switch (c) {
      case 'dt':
        ret = 80;
        break;
      case 'r':
        ret = 120;
        break;
      case 'a':
        ret = 240;
        break;
      case 'b':
        ret = 400;
        break;
      case 'c':
        ret = 600;
        break;
      default:
        break;
    }

    return ret;
  }

}
