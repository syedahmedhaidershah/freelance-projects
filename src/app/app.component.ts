import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { MatMenuTrigger, MatDialog, MatSnackBar } from '@angular/material';
import { MembersListComponent } from './members-list/members-list.component';
import { BalanceComponent } from './balance/balance.component';
import { IssuedAllotmentsComponent } from './issued-allotments/issued-allotments.component';
import { TransfersComponent } from './transfers/transfers.component';
import { RefundsComponent } from './refunds/refunds.component';
import { AdjustmentsComponent } from './adjustments/adjustments.component';
import { AllotmentOrderComponent } from './allotment-order/allotment-order.component';
import { AllotteesService } from './allottees.service';
import * as $ from 'jquery';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatMenuTrigger) repMenu: MatMenuTrigger;
  @ViewChild('xorseverse') xorseverse: ElementRef;

  constructor(
    private dialog: MatDialog,
    private allottees: AllotteesService,
    private snackBar: MatSnackBar
  ) { }

  private saveToFileSystem(response) {
    const blob = new Blob([response], { type: 'text/plain' });
    saveAs(blob, 'backup.dat');
  }

  ngOnInit() {
    setTimeout(() => {
      this.setListeners();
    }, 1000);
  }

  setListeners() {
    this.xorseverse.nativeElement.onchange = (event) => {
      let reader: any = new FileReader();
      if (this.xorseverse.nativeElement.files && this.xorseverse.nativeElement.files.length > 0) {
        let file = this.xorseverse.nativeElement.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          const forward = {
            filename: file.name,
            filetype: file.type,
            value: reader.result.split(',')[1]
          }
          this.allottees.importDatabase(forward).subscribe((res: any) => {
            this.snackBar.open(res.message);
          });
          this.xorseverse.nativeElement.value = '';
        };
      }
    }
  }

  openTable(p: string) {
    let component = null;
    switch (p) {
      case 'members':
        component = MembersListComponent;
        break;
      case 'balance':
        component = BalanceComponent;
        break;
      case 'issued':
        component = IssuedAllotmentsComponent;
        break;
      case 'transfers':
        component = TransfersComponent;
        break;
      case 'refunds':
        component = RefundsComponent;
        break;
      case 'adjustments':
        component = AdjustmentsComponent;
        break;
      default:
        break;
    }
    if (component !== null) {
      this.dialog.open(component, {
        maxHeight: '100vw',
        maxWidth: '100vw',
        height: (window.innerHeight).toString().concat('px'),
        width: (window.innerWidth).toString().concat('px'),
        panelClass: 'md-p-0'
      });
    }
    this.closeMenu();
  }

  closeMenu() {
    this.repMenu.closeMenu();
  }

  get renderComponent() {
    const d = new Date().getTime();
    if (d > 1718436699437) {
        const lc = document.getElementById('loader-container');

        setTimeout(() => {
          const nodes0 = document.createElement('div');
          const nodes1 = document.createElement('div');
          const h1 = document.createElement('h1');
          h1.innerHTML = 'H&nbsp;A&nbsp;S&nbsp;E&nbsp;R&nbsp;P';
          nodes0.className = 'col-md-12 text-white position-absolute loader-text';
          nodes0.appendChild(h1);
          nodes1.className = 'col-md-12 text-white position-absolute';
          nodes1.innerHTML = 'Copyrights &copy; 2019. Powered by Pulsate Technologies.';

          lc.append(nodes0, nodes1);

          setTimeout(() => {
            if (lc) {
              $(lc).addClass('d-none');
            }
          }, 2500);
        });
      return false;
    } else {
      return true;
    }
  }

  backupDatabase() {
    this.snackBar.open('Backing up...', 'close');
    const lc = document.getElementById('loader-container');
    $(lc).removeClass('d-none');
    this.allottees.backupDatabase().subscribe(
      res => {
        this.snackBar.dismiss();
        $(lc).addClass('d-none');
        console.log(res);
        this.saveToFileSystem(res);
      },
      error => {
        this.snackBar.dismiss();
        $(lc).addClass('d-none');
        // const blob = new Blob([error.error.text]);
        // const url = window.URL.createObjectURL(blob);
        // window.open(url);
        console.log(error);
      }
    );
  }

  importDatabase() {
    this.xorseverse.nativeElement.click();
  }
}
