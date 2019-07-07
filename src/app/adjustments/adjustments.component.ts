import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSnackBar, MatDialogRef } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AllotteesService } from '../allottees.service';

@Component({
  selector: 'app-adjustments',
  templateUrl: './adjustments.component.html',
  styleUrls: ['./adjustments.component.css']
})
export class AdjustmentsComponent implements OnInit {

  @ViewChild('mp1') paginator1: MatPaginator;
  @ViewChild('mp2') paginator2: MatPaginator;

  filesList = [];
  showFiles = [];
  dtsa: MatTableDataSource<any>;
  dtsb: MatTableDataSource<any>;
  dops = {};

  // tslint:disable-next-line:max-line-length
  displayedColumns1: string[] = ['sno', 'msno', 'name', 'sowodo', 'amount', 'deduc', 'sp'];
  displayedColumns2: string[] = ['msno', 'name', 'sowodo', 'cl', 'misc', 'int_dev', 'dt'];

  constructor(
    private sanitizer: DomSanitizer,
    private allottees: AllotteesService,
    private snackbar: MatSnackBar,
    private ref: MatDialogRef<AdjustmentsComponent>
  ) { }

  ngOnInit() {
    this.receiveAltes();
  }

  getPBRatio(s: any) {
    let ps = JSON.parse(s.paid);
    let total = 0;

    const keys = Object.keys(ps);
    ps = Object.values(ps);
    const tot: any = ps.reduce((t, a) => {
      return t + a;
    });

    keys.forEach(k => {
      total += s[k];
    });

    return tot / total;

  }

  receiveAltes() {
    this.allottees.getAllAdjustments().subscribe(res => {
      if (res.error) {
        this.snackbar.open(res.message, 'close');
      } else {
        // res.message = res.message.map(r => {
        //   r.transferfrom = JSON.parse(r.transferfrom);
        //   r.transferto = JSON.parse(r.transferto);
        //   return r;
        // });
        
        this.filesList = res.message;
        // this.showFiles = res.message;
        // this.showFiles = this.filesList.filter(f => {
        //   if (f.name !== null && this.getPBRatio(f) < 0.5) {
        //     this.dops[f.msno] = '-';
        //     return f;
        //   }
        // });
        // this.getLastDops();
        // console.log(this.showFiles);

        const arrA = [];
        const arrB = [];

        this.filesList.forEach(a => {
          arrA.push({
            msno: a.msno,
            name: a.msno,
            sowodo: a.sowodo,
            amount: (a.cl + a.misc + a.int_dev),
            // deduc: Math.round(((a.cl + a.misc + a.int_dev) * 0.1)),
            deduc: a.deduction,
            sp: 100
          });
          arrB.push({
            msno: a.adjust_to,
            name: a.name2,
            sowodo: a.sowodo2,
            cl: Math.round(a.cl * 0.9),
            misc: Math.round(a.misc * 0.9),
            int_dev: Math.round(a.int_dev * 0.9),
            dt: this.getDate(a.date)
          });
        });

        this.dtsa = new MatTableDataSource<any>(arrA);
        this.dtsa.paginator = this.paginator1;
        this.dtsb = new MatTableDataSource<any>(arrB);
        this.dtsb.paginator = this.paginator2;
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

      const expesnes = f.cl + f.misc + f.mc + f.surcharge + f.int_dev + f.out_dev + f.misc + f.wcpr;
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

  get getDateToday() {
    return new Date().toLocaleString().split(',')[0];
  }

  getPcl(f: any) {
    return JSON.parse(f.paid).cl;
  }

  getTotal(e: any) {
    return e.cl - this.getPcl(e) + e.misc + e.mc;
  }

  getS15(e: any) {
    return this.getTotal(e) * 1.5;
  }

  getGrand(e: any) {
    return this.getS15(e) + this.getTotal(e);
  }

  getLastDops() {
    Object.keys(this.dops).forEach(k => {
      this.getLastDOP({ msno: k });
    });
  }

  getLastDOP(el: any) {
    this.allottees.getLastDOP(el).subscribe(res => {
      if (res.error) {
        this.snackbar.open(res.message);
      } else {
        if (res.message.length > 0) {
          const dt = new Date(res.message[0].dt).toDateString().split(' ');
          this.dops[el.msno] = dt[1].concat('-').concat(dt[2]);
        }
      }
    });
  }
}
