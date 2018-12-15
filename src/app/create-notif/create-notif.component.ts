import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InappService } from '../inapp.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-notif',
  templateUrl: './create-notif.component.html',
  styleUrls: ['./create-notif.component.css']
})
export class CreateNotifComponent implements OnInit {

  public createNotifForm: FormGroup;
  public announcement = null;
  public body = null;

  constructor(private cn: FormBuilder, private inapp: InappService, private snackBar: MatSnackBar) { }

  private gebi(id) {
    return document.getElementById(id);
  }

  ngOnInit() {
    this.announcement = this.gebi('announcement');
    this.body = this.gebi('body');
    this.createNotifForm = this.cn.group({
      announcement: ['', [
        Validators.required
      ]],
      body: ['', [
        Validators.required
      ]]
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

  pushAnnouncement() {
    const token = this.getCookie('token');
    const datetime = this.getCookie('datetime');
    const announcement = this.createNotifForm.value.announcement;
    const body = this.createNotifForm.value.body;
    this.inapp.pushNotification(token, datetime, announcement, body).subscribe((data) => {
      if (data.error) {
        this.snackBar.open(data.message, 'Close');
      } else {
        this.snackBar.open(data.message, 'Close');
        this.announcement.value = '';
        this.body.value = '';
      }
    });
  }

}
