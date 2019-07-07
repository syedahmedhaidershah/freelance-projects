import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-allotment-order',
  templateUrl: './allotment-order.component.html',
  styleUrls: ['./allotment-order.component.css']
})
export class AllotmentOrderComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AllotmentOrderComponent>
  ) { }

  ngOnInit() {
  }

  get dateToday() {
    return new Date().toLocaleDateString();
  }

  close() {
    this.ref.close();
  }

  print() {
    window.print();
  }

  getDigStr(str, i) {
    return str.substring(i, i + 1);
  }

  getSize(str: string) {
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
