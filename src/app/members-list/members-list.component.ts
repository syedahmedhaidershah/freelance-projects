import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AllotteesService } from '../allottees.service';
import { MatSnackBar, MatPaginator, MatTableDataSource, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filesList = [];
  showFiles = [];
  dts: MatTableDataSource<any>;

  displayedColumns: string[] = ['sno', 'msno', 'name', 'sowodo', 'address', 'doe'];

  constructor(
    private sanitizer: DomSanitizer,
    private allottees: AllotteesService,
    private snackbar: MatSnackBar,
    private ref: MatDialogRef<MembersListComponent>
  ) { }

  ngOnInit() {
    this.receiveAltes();
  }

  receiveAltes() {
    this.allottees.getAll().subscribe(res => {
      if (res.error) {
        this.snackbar.open(res.message, 'close');
      } else {
        res.message = res.message.filter(r => {
          if (r.name !== null) {
            return r;
          }
        });
        this.filesList = res.message;
        this.showFiles = res.message;
        this.showFiles = this.filesList.filter(f => {
          if (f.name !== null) {
            return f;
          }
        });
        this.dts = new MatTableDataSource<any>(this.showFiles);
        this.dts.paginator = this.paginator;
      }
    });
  }

  get getWidthForMid() {
    let width: any = (window.innerWidth / 3) - 150;
    width = (width / window.innerWidth) * 100;
    width = width.toString().concat('%');
    return this.sanitizer.bypassSecurityTrustStyle(width);
  }

  getSno(f: any) {
    let ret = '';
    if (f.allotted === 1) {
      ret = 'Allotment';
    } else {
      const payments = JSON.parse(f.paid);
      const vals = Object.values(payments);
      const total: any = vals.reduce((t: any, a: any) => {
        return t + a;
      });

      const expesnes = f.cl + f.misc + f.mc + f.surcharge + f.int_dev + f.out_dev + f.lease_doc + f.wcpr;
      const ratio = total / expesnes;

      if (ratio === 1) {
        ret = 'F/P';
      } else if (ratio < 1 && ratio > 0.5) {
        ret = 'Member';
      } else {
        ret = '50% Below';
      }
    }

    return ret;
  }

  getDate(d: string) {
    return new Date(d).toLocaleString().split(',')[0];
  }

  close() {
    this.ref.close();
  }

  print() {
    window.print();
  }
}
