import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { RefundAdjustComponent } from '../refund-adjust/refund-adjust.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openPaymentDialog() {
    this.dialog.open(PaymentDialogComponent, {
      height: 'auto',
      width: (window.innerHeight - 100).toString().concat('px'),
      panelClass: 'md-p-0'
    });
  }

  openRefundAdjust() {
    this.dialog.open(RefundAdjustComponent, {
      height: 'auto',
      width: (window.innerHeight - 100).toString().concat('px'),
      panelClass: 'md-p-0'
    });
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

}
