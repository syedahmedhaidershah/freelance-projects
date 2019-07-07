import { Component, OnInit } from '@angular/core';
import { AllotteesService } from '../allottees.service';
import { MatSnackBar, MatDialog, MatSelect } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from '../messages.service';
import { FileViewerComponent } from '../file-viewer/file-viewer.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-allotees-list',
  templateUrl: './allotees-list.component.html',
  styleUrls: ['./allotees-list.component.css']
})
export class AlloteesListComponent implements OnInit {
  filesList = [];
  showFilesList = [];
  searchForm: FormGroup;

  aleType = '0';

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
      if (this.aleType === '1') {
        this.showFilesList = this.showFilesList.filter(f => {
          if (f.allotted === 1) {
            return f;
          }
        });
      } else if (this.aleType === '2') {
        this.showFilesList = this.showFilesList.filter(f => {
          if (f.allotted === 0) {
            return f;
          }
        });
      } else {
        this.showFilesList = this.filesList;
      }
    } else {
      this.showFilesList = this.filesList.filter(f => {
        const regex = new RegExp('('.concat(data).concat(')'));
        if (regex.test(f.msno)) {
          return f;
        }
      });

      if (this.aleType === '1') {
        this.showFilesList = this.showFilesList.filter(f => {
          if (f.allotted === 1) {
            return f;
          }
        });
      } else if (this.aleType === '2') {
        this.showFilesList = this.showFilesList.filter(f => {
          if (f.allotted === 0) {
            return f;
          }
        });
      }
    }
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
        
      }
    });
  }

  checkAllotted(f) {
    if (f.name !== null) {
      return true;
    }
    return false;
  }

  viewFile(f) {
    this.dialog.open(FileViewerComponent, {
      height: (window.innerHeight - 40).toString().concat('px'),
      width: (window.innerWidth - 40).toString().concat('px'),
      data: f,
      maxWidth: '100vw',
      panelClass: 'md-p-0'
    });
  }

  changeAleType(s: MatSelect) {
    this.aleType = s.value;
    this.filterAllotments(this.searchForm.controls.msno.value);
  }
}
