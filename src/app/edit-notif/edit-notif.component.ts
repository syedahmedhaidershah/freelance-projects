import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InappService } from '../inapp.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-notif',
  templateUrl: './edit-notif.component.html',
  styleUrls: ['./edit-notif.component.css']
})
export class EditNotifComponent implements OnInit {

  public editNotifForm: FormGroup;
  public announcement = null;
  public body = null;

  public token = null;
  public datetime = null;
  public _id = null;

  // tslint:disable-next-line:max-line-length
  constructor(private dialogRef: MatDialogRef<EditNotifComponent>, private cn: FormBuilder, private inapp: InappService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public injectedData: any) {
  }

  private gebi(id) {
    return document.getElementById(id);
  }

  ngOnInit() {
    this.announcement = this.gebi('announcement');
    this.body = this.gebi('body');
    this.editNotifForm = this.cn.group({
      announcement: ['', [
        Validators.required
      ]],
      body: ['', [
        Validators.required
      ]]
    });
    Object.keys(this.injectedData).forEach(function (k) {
      this[k] = this.injectedData[k];
    }, this);
    this.inapp.retreiveNotification(this.token, this.datetime, this._id).subscribe((data: any) => {
      if (data.error) {
        this.snackBar.open(data.message, 'Close');
      } else {
        this.announcement.value = data.message.announcement;
        this.body.value = data.message.body;
      }
    });
  }

  public getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  editNotification() {
    const token = this.getCookie('token');
    const datetime = this.getCookie('datetime');
    const announcement = this.editNotifForm.value.announcement;
    const body = this.editNotifForm.value.body;
    this.inapp.editNotification(token, datetime, this._id, announcement, body).subscribe((data) => {
      if (data.error) {
        this.snackBar.open(data.message, 'Close');
      } else {
        this.snackBar.open(data.message, 'Close');
      }
    });
  }

  closeNotification() {
    this.dialogRef.close();
  }
}
