import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewAllotteeComponent } from '../new-allottee/new-allottee.component';

@Component({
  selector: 'app-allotment',
  templateUrl: './allotment.component.html',
  styleUrls: ['./allotment.component.css']
})
export class AllotmentComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(NewAllotteeComponent, {
      height: 'auto',
      width: '600px',
      panelClass: 'md-p-0'
    });
  }

}
