import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { InappService } from '../inapp.service';
import { MatDialog } from '@angular/material';
import { CreateNotifComponent } from '../create-notif/create-notif.component';
import { MatSnackBar } from '@angular/material';
import * as io from 'socket.io-client';
import { EditNotifComponent } from '../edit-notif/edit-notif.component';
import { NewCarouselComponent } from '../new-carousel/new-carousel.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  public notifications = [];
  public carouselImages = [];
  public notificationsCount = 0;
  socket: SocketIOClient.Socket;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private Auth: AuthService, private inapp: InappService, private snackBar: MatSnackBar, private matDialog: MatDialog) {
    this.socket = io('http://localhost:9898');
  }

  ngOnInit() {
    this.checkAuthenticity();
    this.retreiveNotifications();
    this.retreiveCarousels();
    this.socket.on('message', (data) => {
      if (data.changed === 'notification') {
        switch (data.op) {
          case 'insert':
            this.notifications.push(data.doc);
            break;
          case 'delete':
            this.notifications.map((n, index) => {
              if (n._id === data.key._id) {
                this.notifications.splice(index, 1);
              }
            });
            break;
          case 'update':
            this.notifications.map(n => {
              if (n._id === data.key._id) {
                const updated = data.update.updatedFields;
                Object.keys(updated).forEach(f => {
                  n[f] = updated[f];
                });
              }
            });
            break;
          default:
            break;
        }
      } else if (data.changed === 'carousel') {
        switch (data.op) {
          case 'insert':
            this.carouselImages.push(data.doc);
            break;
          case 'delete':
            this.carouselImages.map((n, index) => {
              if (n._id === data.key._id) {
                this.carouselImages.splice(index, 1);
              }
            });
            break;
          case 'update':
            this.carouselImages.map(n => {
              if (n._id === data.key._id) {
                const updated = data.update.updatedFields;
                Object.keys(updated).forEach(f => {
                  n[f] = updated[f];
                });
              }
            });
            break;
          default:
            break;
        }
    });
  }

  public gebi(id: string) {
    return document.getElementById(id);
  }

  public geci(className: string) {
    return Array.from(document.getElementsByClassName(className));
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

  public setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  public checkAuthenticity() {
    const token = this.getCookie('token');
    const datetime = this.getCookie('datetime');
    this.inapp.checkForToken(token, datetime).subscribe(data => {
      if (!data.error) {
        this.router.navigate(['panel']);
        this.Auth.setLoggedIn(true);
        $('#logoutbutton').addClass('active');
      }
    });
  }

  async retreiveNotifications() {
    const token = this.getCookie('token');
    const datetime = this.getCookie('datetime');
    this.inapp.getNotifications(token, datetime).subscribe(data => {
      if (data.error) {
        window.alert(data.message);
      } else {
        this.notifications = data.message.data;
      }
    });
  }

  retreiveCarousels() {
    const token = this.getCookie('token');
    const datetime = this.getCookie('datetime');
    this.inapp.retreiveCarousels(token, datetime).subscribe(data => {
      if (data.error) {
        window.alert(data.message);
      } else {
        this.carouselImages = data.message;
      }
    });

  }

  openCreateNotifDialog() {
    const dialogRef = this.matDialog.open(CreateNotifComponent, {
      height: '400px',
      width: '600px',
    });
  }

  deleteNotifications(buttonID) {
    const token = this.getCookie('token');
    const datetime = this.getCookie('datetime');
    this.inapp.deleteNotification(token, datetime, buttonID).subscribe(data => {
      if (data.error) {
        this.snackBar.open(data.message, 'Close');
      } else {
        this.snackBar.open(data.message, 'Close');
      }
    });
  }

  editNotifications(buttonID) {
    const token = this.getCookie('token');
    const datetime = this.getCookie('datetime');
    const dialogRef = this.matDialog.open(EditNotifComponent, {
      height: '400px',
      width: '600px',
      data: {
        _id: buttonID,
        token: token,
        datetime: datetime
      }
    });
  }

  openNewCarousel() {
    const dialogRef = this.matDialog.open(NewCarouselComponent, {
      height: '400px',
      width: '600px'
    });
  }

  editCarousel(id) {

  }

  deleteCarousel(id) {
    const token = this.getCookie('token');
    const datetime = this.getCookie('datetime');
    this.inapp.deleteCarousel(token, datetime, id).subscribe(data => {
      this.snackBar.open(data.message, 'Close');
    });
  }
}
