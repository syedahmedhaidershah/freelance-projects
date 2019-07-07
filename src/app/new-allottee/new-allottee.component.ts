import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllotteesService } from '../allottees.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-new-allottee',
  templateUrl: './new-allottee.component.html',
  styleUrls: ['./new-allottee.component.css']
})
export class NewAllotteeComponent implements OnInit {

  newAllottee: FormGroup;
  filesList: [];
  showFilesList = [];

  constructor(
    private fb: FormBuilder,
    private allottees: AllotteesService,
    private snackBar: MatSnackBar,
    private messages: MessagesService,
    private ref: MatDialogRef<NewAllotteeComponent>
  ) { }

  ngOnInit() {
    this.newAllottee = this.fb.group({
      msno: ['', Validators.required],
      name: ['', Validators.required],
      cnic: ['', Validators.required],
      sowodo: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.allottees.getAll().subscribe(res => {
      if (res.error) {
        this.snackBar.open(res.message);
        this.ref.close();
      } else {
        this.filesList = res.message;
        this.showFilesList = res.message;
      }
    });
    this.newAllottee.controls.msno.valueChanges.subscribe(data => {
      if (data !== undefined && data !== '' && data !== null) {
        this.filterAllotments(data);
        const wantedFile = this.filesList.filter((f: any) => {
          if (f.msno === data) {
            return f;
          }
        });
        if (wantedFile.length > 0) {
          Object.keys(this.newAllottee.controls).forEach(k => {
            if (k !== 'msno' && wantedFile[0][k] !== null && wantedFile[0][k] !== '') {
              this.newAllottee.controls[k].setValue(wantedFile[0][k]);
            }
          });
        }
      } else {
        Object.keys(this.newAllottee.controls).forEach(k => {
          if (k !== 'msno') {
            this.newAllottee.controls[k].reset();
            this.showFilesList = this.filesList;
          }
        });
      }
    });
  }

  filterAllotments(data) {
    this.showFilesList = this.filesList;
    if (data === undefined || data === '' || data === null) {
      this.showFilesList = this.filesList;
    } else {
      this.showFilesList = this.filesList.filter((f: any) => {
        const regex = new RegExp('('.concat(data).concat(')'));
        if (regex.test(f.msno)) {
          return f;
        }
      });
    }
  }

  updateFileNew() {
    if (this.newAllottee.valid) {
      this.allottees.updateFileNew(this.newAllottee.value).subscribe(res => {
        this.snackBar.open(res.message);
        if (res.error === false) {
          this.messages.changeMessage('files');
          this.ref.close();
        }
      });
    } else {
      this.snackBar.open('Please input all of the fields correctly', 'close');
    }
  }

  isAssigned(f) {
    let not = false;
    Object.keys(this.newAllottee.controls).forEach(k => {
      if (k !== 'msno' && f[k] !== null && f[k] !== '') {
        not = true;
      }
    });
    return not;
  }

}
