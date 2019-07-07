import { Component, OnInit } from '@angular/core';
import { AllotteesService } from '../allottees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.css']
})
export class AdjustmentComponent implements OnInit {

  filesList = [];
  showFilesList = [];

  filesListTo = [];
  showFilesListTo = [];

  selectedFile: any;
  selectedFileTo: any;
  payments = [];

  deducMax = 0;
  payableMax = 0;
  paidBeforeHand = 0;

  actionType = null;

  adjustForm: FormGroup;

  constructor(
    private allottees: AllotteesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private ref: MatDialogRef<AdjustmentComponent>,
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
    this.adjustForm = this.fb.group({
      msno: ['', Validators.required],
      toMsno: [{ value: '', disabled: true }, Validators.required],
      cl: [{ value: '0', disabled: true }, Validators.required],
      misc: [{ value: '0', disabled: true }, Validators.required],
      int_dev: [{ value: '0', disabled: true }, Validators.required],
      deduction: [{ value: '0', disabled: true }, Validators.required]
      // deduction: [{ value: '', disabled: true }, Validators.required],
      // amount: [{ value: '0', disabled: true }, Validators.required]
    });
  }


  setListeners() {
    this.adjustForm.valueChanges.subscribe(res => {
      this.snackBar.dismiss();
    });
    this.adjustForm.controls.msno.valueChanges.subscribe(data => {
      // this.showFilesListTo = this.showFilesList;
      this.filterAllotmentsFrom(data);
      if (data === '') {
        this.selectedFile = null;
        this.adjustForm.controls.toMsno.disable();
      } else {
        this.adjustForm.controls.toMsno.enable();
      }
    });
    this.adjustForm.controls.toMsno.valueChanges.subscribe(data => {
      // this.showFilesListTo = this.showFilesList;
      if (data === '') {
        this.selectedFileTo = null;
        this.adjustForm.controls.cl.disable();
        this.adjustForm.controls.misc.disable();
        this.adjustForm.controls.int_dev.disable();
        this.adjustForm.controls.deduction.disable();
      } else {
        this.filterAllotmentsTo(data);
        this.adjustForm.controls.cl.enable();
        this.adjustForm.controls.misc.enable();
        this.adjustForm.controls.int_dev.enable();
        this.adjustForm.controls.deduction.enable();
      }
    });
    this.adjustForm.controls.deduction.valueChanges.subscribe(data => {
      if (parseInt(data, 10) > this.getPaid) {
        this.adjustForm.controls.deduction.setValue(this.getPaid);
      }
    });
  }

  filterAllotmentsFrom(data) {
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

  filterAllotmentsTo(data) {
    this.showFilesListTo = this.filesListTo;
    if (data === undefined || data === '' || data === null) {
      this.showFilesListTo = this.filesListTo;
    } else {
      this.showFilesListTo = this.filesListTo.filter(f => {
        const regex = new RegExp('('.concat(data).concat(')'));
        if (regex.test(f.msno) && f.allotted === 0) {
          return f;
        }
      });
    }
    this.showFilesListTo = this.showFilesListTo.filter(f => {
      if (f.msno !== this.selectedFile.msno) {
        return f;
      }
    });
  }


  retreiveAltes() {
    this.allottees.getAll().subscribe(res => {
      if (res.error) {
        this.snackBar.open(res.message);
      } else {
        res.message = res.message.filter(r => {
          if (r.name !== null) {
            return r;
          }
        });
        this.filesList = res.message;
        this.showFilesList = res.message;
        this.filesListTo = res.message;
        this.showFilesListTo = res.message;
      }
    });
  }

  selectFileFrom($e) {
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
    // this.adjustForm.controls.deduction.setValue(this.getDeduction);
    this.payableMax = this.getBalance - this.getDeduction;
    this.showFilesListTo = this.showFilesListTo.filter(f => {
      if (f.msno !== this.selectedFile.msno) {
        return f;
      }
    });
  }

  selectFileTo($e) {
    this.selectedFileTo = this.filesListTo.filter(f => {
      if (f.msno === $e.option.value) {
        return f;
      }
    })[0];
    this.payments = [
      { value: 'cl', label: 'Cost of Land', amount: this.selectedFileTo.cl },
      { value: 'misc', label: 'Miscellaneous', amount: this.selectedFileTo.misc },
      { value: 'mc', label: 'M/C', amount: this.selectedFileTo.mc },
      { value: 'surcharge', label: 'Surcharge', amount: this.selectedFileTo.surcharge },
      { value: 'int_dev', label: 'Int/Dev', amount: this.selectedFileTo.int_dev },
      { value: 'out_dev', label: 'Out/Dev', amount: this.selectedFileTo.out_dev },
      { value: 'lease_doc', label: 'Lease Documentation Charge', amount: this.selectedFileTo.lease_doc },
      { value: 'wcpr', label: 'West-open / Corner / Park-facing / Road-side', amount: this.selectedFileTo.wcpr },
    ];
    // this.deducMax = this.getBalance;
    // this.adjustForm.controls.deduction.setValue(this.getDeduction);
    // this.payableMax = this.getBalance - this.getDeduction;
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
    let ded = 0;
    const f = this.adjustForm.value;
    if (f.cl !== '' && f.cl !== undefined && f.cl !== null) {
      ded += parseInt(f.cl, 10);
    }
    if (f.misc !== '' && f.misc !== undefined && f.misc !== null) {
      ded += parseInt(f.misc, 10);
    }
    if (f.int_dev !== '' && f.int_dev !== undefined && f.int_dev !== null) {
      ded += parseInt(f.int_dev, 10);
    }
    // return (this.getPaid * 0.1).toFixed(0)
    return parseInt((ded * 0.1).toFixed(0), 10);
  }

  get getControlledDeduction() {
    let ret = 0;
    // tslint:disable-next-line:max-line-length
    if (this.adjustForm.controls.deduction.valid && this.adjustForm.controls.deduction.value !== '' && this.adjustForm.controls.deduction.value !== null) {
      ret += parseInt(this.adjustForm.controls.deduction.value, 10);
    }
    return ret;
  }

  get getToAdjust() {
    let ret = 0;
    if (this.adjustForm.controls.cl.valid && this.adjustForm.controls.cl.value !== '' && this.adjustForm.controls.cl.value !== null) {
      ret += parseInt(this.adjustForm.controls.cl.value, 10);
    }
    if (this.adjustForm.controls.misc.valid && this.adjustForm.controls.misc.value !== '' && this.adjustForm.controls.misc.value !== null) {
      ret += parseInt(this.adjustForm.controls.misc.value, 10);
    }
    // tslint:disable-next-line:max-line-length
    if (this.adjustForm.controls.int_dev.valid && this.adjustForm.controls.int_dev.value !== '' && this.adjustForm.controls.int_dev.value !== null) {
      ret += parseInt(this.adjustForm.controls.int_dev.value, 10);
    }
    return this.getPaid - this.getControlledDeduction - ret;
    // return this.getPaid - ret;
  }

  adjust() {
    if (this.adjustForm.valid) {
      const forward = this.adjustForm.value;
      forward.date = new Date();

      this.allottees.adjustFile(forward).subscribe(res => {
        this.snackBar.open(res.message, 'close');
        if (res.error === false) {
          this.ref.close();
        }
      });
    }
  }

}
