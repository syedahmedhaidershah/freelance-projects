import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwnersService } from '../owners.service';
import { AllotteesService } from '../allottees.service';
import { MessagesService } from '../messages.service';
import { AllotmentOrderComponent } from '../allotment-order/allotment-order.component';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements OnInit {
  setTransferState = false;
  getAllotteeState = true;

  prevOwners = [
    { name: '-', cnic: '-', sowodo: '-', phone: '-', address: '-', plot_no: '-', category: '-', phase: '-' },
    { name: '-', cnic: '-', sowodo: '-', phone: '-', address: '-', plot_no: '-', category: '-', phase: '-' },
    { name: '-', cnic: '-', sowodo: '-', phone: '-', address: '-', plot_no: '-', category: '-', phase: '-' },
    { name: '-', cnic: '-', sowodo: '-', phone: '-', address: '-', plot_no: '-', category: '-', phase: '-' },
    { name: '-', cnic: '-', sowodo: '-', phone: '-', address: '-', plot_no: '-', category: '-', phase: '-' },
    { name: '-', cnic: '-', sowodo: '-', phone: '-', address: '-', plot_no: '-', category: '-', phase: '-' },
    { name: '-', cnic: '-', sowodo: '-', phone: '-', address: '-', plot_no: '-', category: '-', phase: '-' },
    { name: '-', cnic: '-', sowodo: '-', phone: '-', address: '-', plot_no: '-', category: '-', phase: '-' }
  ];

  allotteeDetails: FormGroup;
  balanceAmounts: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public f: any,
    private fb: FormBuilder,
    private owners: OwnersService,
    private snackBar: MatSnackBar,
    private allottees: AllotteesService,
    private messages: MessagesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.messages.currentMessage.subscribe(res => {
      this.getData();
    });
    this.initForm();
    this.retreivePrevOwners();
    this.recheckAllotteeState();
    this.setListeners();
  }

  setListeners() {
    this.allotteeDetails.valueChanges.subscribe(val => this.recheckAllotteeState());
  }

  getData() {
    this.allottees.getFileData(this.f).subscribe(res => {
      if (res.error) {
        this.snackBar.open(res.message, 'close');
      } else {
        this.f = res.message[0];
        this.retreivePrevOwners();
      }
    });
  }

  retreivePrevOwners() {
    this.owners.get(this.f).subscribe(res => {
      if (res.error) {
        this.snackBar.open(res.message, 'close');
      } else {
        for (let i = 1; i <= 8; i++) {
          const index = 'o'.concat(i.toString());
          if (res.message[0][index] !== undefined && res.message[0][index] !== null) {
            this.prevOwners[i - 1] = this.getCleanPrevData(res.message[0][index]);
          }
        }
        // console.log(this.prevOwners);
      }
    });
  }

  isJson(obj: any) {
    let ret = false;
    try {
      JSON.parse(obj);
      ret = false;
    } catch (exc) {
      if (typeof obj === 'object') {
        ret = true;
      }
    }
    return ret;
  }

  getCleanPrevData(data) {
    let d: any;
    try {
      d = JSON.parse(data);
      Object.keys(d).forEach(k => {
        if (d[k] === null || d[k] === undefined || d[k] === '') {
          d[k] = '-';
        }
      });
    } catch (exc) {
      console.log(exc);
      d = { name: '-', cnic: '-', sowodo: '-', phone: '-', address: '-', plot_no: '-', category: '-', phase: '-' };
    }

    return d;
  }

  initForm() {
    if (this.f.name === '' || this.f.name === undefined || this.f.name === null) {
      this.setTransferState = true;
    }
    this.allotteeDetails = this.fb.group({
      name: ['', Validators.required],
      cnic: ['', Validators.required],
      sowodo: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      plot_no: ['', Validators.required],
      category: ['', Validators.required],
      phase: ['', Validators.required]
    });
    this.balanceAmounts = this.fb.group({
      cl: ['', Validators.required],
      misc: ['', Validators.required],
      mc: ['', Validators.required],
      surcharge: ['', Validators.required],
      int_dev: ['', Validators.required],
      out_dev: ['', Validators.required],
      lease_doc: ['', Validators.required],
      wcpr: ['', Validators.required]
    });
    Object.keys(this.f).forEach(k => {
      if (this.allotteeDetails.contains(k)) {
        this.allotteeDetails.controls[k].setValue(this.f[k]);
      } else if (this.balanceAmounts.contains(k)) {
        this.balanceAmounts.controls[k].setValue(this.f[k]);
      }
    });
  }

  editAllotteeDetails() {
    if (this.allotteeDetails.valid) {
      const request: any = {};
      Object.keys(this.allotteeDetails.controls).forEach(k => {
        if (!(this.balanceAmounts.contains(k))) {
          request[k] = this.allotteeDetails.controls[k].value;
        }
      });
      request.aid = this.f.aid;
      this.allottees.updateFileAllottee(request).subscribe(res => {
        this.snackBar.open(res.message, 'close');
        if (res.error === false) {
          this.messages.changeMessage('files');
        }
      });
    } else {
      this.snackBar.open('Please enter all of the details for the allottee', 'close');
    }
  }

  get checkBalanceOnly() {
    let total = 0;
    const paid = JSON.parse(this.f.paid);

    Object.keys(this.balanceAmounts.controls).forEach(c => {
      total += this.f[c] - paid[c];
    });

    if (total > 0) {
      return true;
    } else {
      return false;
    }
  }

  get checkBalance() {
    let total = 0;
    const paid = JSON.parse(this.f.paid);

    Object.keys(this.balanceAmounts.controls).forEach(c => {
      total += this.f[c] - paid[c];
    });
    let missed = false;
    Object.values(this.f).forEach((v: any) => {
      if (v === '' || v === undefined || v === null) {
        missed = true;
      }
    });

    if (total > 0 || missed) {
      return true;
    } else {
      return false;
    }
  }

  get getTransferState() {
    if (this.f.allotted === 0) {
      return true;
    } else {
      return false;
    }
  }

  updateAmount($e) {
    $e.preventDefault();
    if (this.balanceAmounts.valid) {
      const forward = this.balanceAmounts.value;
      forward.aid = this.f.aid;
      this.allottees.updateFileBalance(forward).subscribe(res => {
        if (!(res.error)) {
          this.messages.changeMessage('files');
        }
        this.snackBar.open(res.message, 'close');
      });
    } else {
      this.snackBar.open('Please enter balance amounts for all of the accounts', 'close');
    }
  }

  recheckAllotteeState() {
    let missed = true;
    Object.keys(this.f).forEach((k: any) => {
      if (this.allotteeDetails.contains(k)) {
        if (k === '' || k === undefined || k === null) {
          missed = false;
          return false;
        } else {
        }
      }
    });
    this.getAllotteeState = missed;
  }

  allotFile() {
    if (this.f.name === null || this.f.name === undefined || this.f.name === '') {
      this.snackBar.open('Please input all of the fields for the member');
    } else {
      this.allottees.allotFile(this.f).subscribe(res => {
        this.snackBar.open(res.message, 'close');
        if (res.error === false) {
          this.messages.changeMessage('files');

          // const ref = this.dialog.open(AllotmentOrderComponent, {
          //   maxHeight: '100vw',
          //   maxWidth: '100vw',
          //   height: (window.innerHeight).toString().concat('px'),
          //   width: (window.innerWidth).toString().concat('px'),
          //   panelClass: 'md-p-0',
          //   data: this.f
          // });
        }
      });
    }
  }

  transferFile() {
    if (this.allotteeDetails.valid) {
      const request: any = {};
      Object.keys(this.allotteeDetails.controls).forEach(k => {
        if (!(this.balanceAmounts.contains(k))) {
          request[k] = this.allotteeDetails.controls[k].value;
        }
      });
      request.aid = this.f.aid;
      this.allottees.transferFile(request).subscribe(res => {
        this.snackBar.open(res.message, 'close');
        if (res.error === false) {
          this.messages.changeMessage('files');
        }
      });
    } else {
      this.snackBar.open('Please enter all of the details for the allottee', 'close');
    }

  }

  getPaid(pt: string) {
    return JSON.parse(this.f.paid)[pt];
  }

  leadToPayout(str: string) {
    const ref = this.dialog.open(PaymentDialogComponent, {
      height: 'auto',
      width: (window.innerHeight - 100).toString().concat('px'),
      panelClass: 'md-p-0',
      data: {
        data: this.f,
        type: str
      }
    });
    ref.afterClosed().subscribe(res => {
      this.messages.changeMessage('received');
    });
  }
}
