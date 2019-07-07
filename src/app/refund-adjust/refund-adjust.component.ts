import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllotteesService } from '../allottees.service';
import { MatSnackBar, MatDialogRef, MatSelect } from '@angular/material';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-refund-adjust',
  templateUrl: './refund-adjust.component.html',
  styleUrls: ['./refund-adjust.component.css']
})
export class RefundAdjustComponent implements OnInit {
  filesList = [];
  showFilesList = [];

  selectedFile: any;
  payments = [];

  deducMax = 0;
  payableMax = 0;

  actionType = null;

  refundForm: FormGroup;

  constructor(
    private allottees: AllotteesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private ref: MatDialogRef<RefundAdjustComponent>,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    this.initForms();
    this.messages.currentMessage.subscribe(res => {
      this.retreiveAltes();
    });
    this.retreiveAltes();
    this.setListeners();
  }

  initForms() {
    this.refundForm = this.fb.group({
      msno: ['', Validators.required],
      deduction: [{ value: '', disabled: true }, Validators.required],
      amount: [{ value: '0', disabled: true }, Validators.required]
    });
  }

  setListeners() {
    this.refundForm.valueChanges.subscribe(res => {
      this.snackBar.dismiss();
    });
    this.refundForm.controls.msno.valueChanges.subscribe(data => {
      this.filterAllotments(data);
      if (data === '') {
        this.selectedFile = null;
        this.refundForm.controls.deduction.disable();
      } else {
        this.refundForm.controls.deduction.enable();
      }
    });
    this.refundForm.controls.deduction.valueChanges.subscribe(data => {
      if (parseInt(data, 10) > this.getPaid) {
        this.refundForm.controls.deduction.setValue(this.getPaid);
      }
      this.refundForm.controls.amount.setValue(this.getPaid - parseInt(this.refundForm.controls.deduction.value, 10));
    });
  }

  filterAllotments(data) {
    this.showFilesList = this.filesList;
    if (data === undefined || data === '' || data === null) {
      this.showFilesList = this.filesList;
    } else {
      this.showFilesList = this.filesList.filter(f => {
        const regex = new RegExp('('.concat(data).concat(')'));
        if (regex.test(f.msno) && f.allotted === 0) {
          return f;
        }
      });
    }
  }

  retreiveAltes() {
    this.allottees.getAll().subscribe(res => {
      if (res.error) {
        this.snackBar.open(res.message);
      } else {
        res.message = res.message.filter(r => {
          if (r.name !== null && r.allotted === 0) {
            return r;
          }
        });
        this.filesList = res.message;
        this.showFilesList = res.message;
      }
    });
  }

  selectFile($e) {
    this.selectedFile = this.filesList.filter(f => {
      if (f.msno === $e.option.value) {
        return f;
      }
    })[0];
    this.payments = [
      { value: 'cl', label: 'Cost of Land', amount: this.selectedFile.cl },
      { value: 'misc', label: 'Miscellaneous', amount: this.selectedFile.misc },
      { value: 'mc', label: 'M/C', amount: this.selectedFile.mc },
      { value: 'surcharge', label: 'Surcharge', amount: this.selectedFile.surcharge },
      { value: 'int_dev', label: 'Int/Dev', amount: this.selectedFile.int_dev },
      { value: 'out_dev', label: 'Out/Dev', amount: this.selectedFile.out_dev },
      { value: 'lease_doc', label: 'Lease Documentation Charge', amount: this.selectedFile.lease_doc },
      { value: 'wcpr', label: 'West-open / Corner / Park-facing / Road-side', amount: this.selectedFile.wcpr },
    ];
    this.deducMax = this.getBalance;
    this.refundForm.controls.deduction.setValue(this.getDeduction);
    this.payableMax = this.getBalance - this.getDeduction;
  }

  get getBalance() {
    let balance = 0;
    if (this.selectedFile !== null && this.selectedFile !== undefined) {
      const paid = JSON.parse(this.selectedFile.paid);

      Object.keys(paid).forEach(k => {
        balance += this.selectedFile[k] - paid[k];
      });
    }
    return balance;
  }

  get getPaid() {
    let paid = 0;
    if (this.selectedFile !== null && this.selectedFile !== undefined) {
      const payObj = JSON.parse(this.selectedFile.paid);

      const arr = (Object.values(payObj));
      paid = (arr as any).reduce((t, c) => t + c);
    }
    return paid;
  }

  get fileNotFound() {
    let state = true;
    if (this.selectedFile !== undefined && this.selectedFile !== null) {
      state = false;
    }
    return state;
  }

  get getDeduction() {
    return 0;
    // return parseInt((this.getPaid * 0.1).toFixed(0), 10);
  }

  changeAction(s: MatSelect) {
    this.actionType = s.value;
  }

  refund() {
    if (this.refundForm.valid) {
      const forward = this.refundForm.value;
      forward.file = this.selectedFile;
      forward.deducMax = this.deducMax;
      forward.payableMax = this.payableMax;
      forward.payments = this.payments;
      this.allottees.refundFile(forward).subscribe(res => {
        this.snackBar.open(res.message);
        if (res.error === false) {
          this.messages.changeMessage('refund');
          this.ref.close();
        }
      });
    }
  }

  get getRefundState() {
    if (this.refundForm.valid) {
      return false;
    } else {
      return true;
    }
  }
}
