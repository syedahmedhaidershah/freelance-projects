import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllotteesService } from '../allottees.service';
import { MatSnackBar, MatDialog, MatSelect, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {
  @ViewChild('typeSelect') public typeSelect: MatSelect;
  filesList = [];
  showFilesList = [];
  paymentForm: FormGroup;

  selectedFile: any;
  payments = [];
  selectedType = '';
  pending = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public injected: any,
    private allottees: AllotteesService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private messages: MessagesService,
    private dialog: MatDialog,
    private ref: MatDialogRef<PaymentDialogComponent>
  ) { }

  ngOnInit() {
    this.messages.currentMessage.subscribe(res => {
      this.retreiveAltes();
    });
    this.retreiveAltes();
    this.initForm();
    this.setListeners();
    if (this.injected !== null ) {
      // console.log(this.injected);
      this.paymentForm.controls.msno.setValue(this.injected.data.msno);
      this.filterAllotments(this.injected.data.msno);
      this.typeSelect.writeValue(this.injected.type);
    }
  }

  initForm() {
    this.paymentForm = this.fb.group({
      msno: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  setListeners() {
    this.paymentForm.controls.msno.valueChanges.subscribe(data => {
      this.filterAllotments(data);
      if (data === '') {
        this.selectedFile = null;
      }
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
      { value: 'cl', label: 'Cost of Land', amount: this.selectedFile.cl - JSON.parse(this.selectedFile.paid).cl },
      { value: 'misc', label: 'Miscellaneous', amount: this.selectedFile.misc - JSON.parse(this.selectedFile.paid).misc },
      { value: 'mc', label: 'M/C', amount: this.selectedFile.mc - JSON.parse(this.selectedFile.paid).mc },
      { value: 'surcharge', label: 'Surcharge', amount: this.selectedFile.surcharge - JSON.parse(this.selectedFile.paid).surcharge },
      { value: 'int_dev', label: 'Int/Dev', amount: this.selectedFile.int_dev - JSON.parse(this.selectedFile.paid).int_dev },
      { value: 'out_dev', label: 'Out/Dev', amount: this.selectedFile.out_dev - JSON.parse(this.selectedFile.paid).out_dev },
      // tslint:disable-next-line:max-line-length
      { value: 'lease_doc', label: 'Lease Documentation Charge', amount: this.selectedFile.lease_doc - JSON.parse(this.selectedFile.paid).lease_doc },
      // tslint:disable-next-line:max-line-length
      { value: 'wcpr', label: 'West-open / Corner / Park-facing / Road-side', amount: this.selectedFile.wcpr - JSON.parse(this.selectedFile.paid).wcpr },
    ];
  }

  get isTypeDisabled() {
    if (this.selectedFile !== null && this.selectedFile !== undefined && this.selectedFile !== '') {
      return false;
    } else {
      return true;
    }
  }

  setType(s: MatSelect) {
    this.selectedType = s.value;
    const amLeft = this.payments.filter(p => {
      if (p.value === s.value) {
        return p;
      }
    })[0];

    this.paymentForm.controls.amount.setValue(amLeft.amount);
    this.pending = amLeft.amount;
  }

  receivePayment() {
    if (this.paymentForm.valid) {
      const forward = this.paymentForm.value;
      forward.type = this.selectedType;
      forward.msno = this.selectedFile.msno;
      forward.pending = this.pending;

      this.allottees.receivePayment(forward).subscribe(res => {
        this.snackBar.open(res.message);

        if (res.error === false) {
          this.ref.close();
        }
      });
    } else {
      this.snackBar.open('Please input all of the fields correctly', 'close');
    }
  }

  get receiveDisabled() {
    // tslint:disable-next-line:max-line-length
    if (this.selectedFile !== null && this.selectedFile !== undefined && this.selectedFile !== '' && this.selectedType !== null && this.selectedType !== undefined && this.selectedType !== '' && this.paymentForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  get showPending() {
    // tslint:disable-next-line:max-line-length
    if (this.selectedFile !== null && this.selectedFile !== undefined && this.selectedFile !== '' && this.selectedType !== null && this.selectedType !== undefined && this.selectedType !== '') {
      return true;
    } else {
      return false;
    }
  }

}
