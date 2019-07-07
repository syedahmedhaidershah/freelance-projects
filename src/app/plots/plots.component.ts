import { Component, OnInit } from '@angular/core';
import { AllotteesService } from '../allottees.service';
import { MatSnackBar, MatDialog, MatSelect } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from '../messages.service';
import { FileViewerComponent } from '../file-viewer/file-viewer.component';
import { SwitchFileComponent } from '../switch-file/switch-file.component';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.css']
})
export class PlotsComponent implements OnInit {

  allFiles = [];
  filesList = [];
  showFilesList = [];
  searchForm: FormGroup;

  constructor(
    private allottees: AllotteesService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private messages: MessagesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.messages.currentMessage.subscribe(res => {
      this.retreiveAltes();
    });
    this.retreiveAltes();
    this.initForm();
    this.setListeners();
  }

  initForm() {
    this.searchForm = this.fb.group({
      msno: ['', Validators.required]
    });
  }

  setListeners() {
    this.searchForm.controls.msno.valueChanges.subscribe(data => {
      this.filterAllotments(data);
    });
  }

  filterAllotments(data) {
    this.showFilesList = this.filesList;
    if (data === undefined || data === '' || data === null) {
      this.showFilesList = this.filesList;
    } else {
      this.showFilesList = this.filesList.filter(f => {
        const regex = new RegExp('('.concat(data).concat(')'));
        if (regex.test(f.plot_no)) {
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
        this.allFiles = res.message;
        res.message = res.message.filter(r => {
          if (r.plot_no !== '' && r.plot_no !== null) {
            return r;
          }
        });
        this.filesList = res.message;
        this.showFilesList = res.message;
      }
    });
  }

  checkAllotted(f) {
    if (f.name !== null) {
      return true;
    }
    return false;
  }

  switchFile(f) {
    this.dialog.open(SwitchFileComponent, {
      height: 'auto',
      width: '600px',
      data: {
        file: f,
        all: this.allFiles
      },
      maxWidth: '100vw',
      panelClass: 'md-p-0'
    });
  }

}
