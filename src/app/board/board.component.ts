import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { InappService } from '../inapp.service';
import * as io from 'socket.io-client';

interface Announcement {
  _id: string;
  announcement: string;
  body: string;
}

const announcementCard = {
  '0': '<div id="',
  '1': '" class="card col-md-12 p-3 mb-2 shadow-lighter bg-info text-white"><div id="anna',
  '2': '" class="text-white font-weight-bold">',
  '3': '</div><div class="text-white"><small id="annb',
  '4': '">',
  '5': '</small></div></div>'
};

function announcementString(ann: any, key: string) {
  const card = announcementCard;
  return card[0] + `i${key}` + card[1] + key + card[2] + ann.announcement + card[3] + key + card[4] + ann.body + card[5];  
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public token = null;
  public datetime = null;

  public notifications = {};
  public notificationsCount = 0;
  public notificationSection = null;
  socket: SocketIOClient.Socket;

  constructor(private bs: BoardService, private inapp: InappService) {
    this.socket = io('http://localhost:9898');
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

  private proceed() {
    this.notificationSection = this.gebi('notifications-section');
    this.retreiveNotifications();
  }

  ngOnInit() {
    this.bs.getToken().subscribe((data) => {
      this.token = data.message.token;
      this.datetime = data.message.datetime;
      this.setCookie('token', this.token, 1);
      this.setCookie('datetime', this.datetime, 1);
      this.proceed();
    });
    this.socket.on('message', (data) => {
      switch (data.op) {
        case 'insert':
          this.setNotifications([data.doc], 'map');
          this.renderNotifications();
          break;
        case 'delete':
          delete this.notifications[data.key._id];
          this.gebi(`i${data.key._id}`).remove();
          if (Object.keys(this.notifications).length === 0) {
            this.notificationSection.innerHTML = 'No announcements have been published yet.';
          }
          break;
        case 'update':
          let updatedFields = data.update.updatedFields;
          Object.keys(updatedFields).forEach(function (u) {
            switch (u) {
              case 'announcement':
                // this.gebi(`i${data.key._id}`).children
                this.gebi(`anna${data.key._id}`).innerHTML = updatedFields[u];
                break;
              case 'body':
                this.gebi(`annb${data.key._id}`).innerHTML = updatedFields[u];
                break;
              default:
                break;
            }
          }, this);
          break;
        default:
          break;
      }
    });
  }

  async retreiveNotifications() {
    const token = this.getCookie('token');
    const datetime = this.getCookie('datetime');
    this.inapp.getNotifications(token, datetime).subscribe(data => {
      if (data.error) {
        // window.alert(data.message);
      } else {
        let proceed = false;
        if (data.message.length === 0) {
          proceed = this.setNotifications([], 'absolute');
        } else {
          proceed = this.setNotifications(data.message.data, 'map');
        }
        if (proceed) {
          if (this.notificationsCount === 0) {
            this.notificationSection.innerHTML = 'No announcements have been published yet.';
          } else {
            this.renderNotifications();
          }
        }
      }
    });
  }


  private setNotifications(data: Array<Object>, insertion: any) {
    const prevKeys = [], currKeys = [];
    let count = 0;
    let buffer = this.notifications;
    Object.keys(this.notifications).forEach(function (key) {
      prevKeys.push(key);
    });
    data.forEach(function (n: Announcement) {
      switch (insertion) {
        case 'absolute':
          count += 1;
          buffer = {};
          const announcement = {
            announcement: n.announcement,
            body: n.body
          };
          buffer[n._id] = announcement;
          break;
        case 'map':
          currKeys.push(n._id);
          if (!buffer.hasOwnProperty(n._id)) {
            count += 1;
            const announcement = {
              announcement: n.announcement,
              body: n.body
            };
            buffer[n._id] = announcement;
          }
          break;
        default:
          break;
      }
    });
    this.notificationsCount = count;
    this.notifications = buffer;
    return true;
  }

  private renderNotifications() {
    let pushAnn = '';
    const notifications = this.notifications;
    Object.keys(this.notifications).forEach(function (n) {
      const newAnnouncement = announcementString(notifications[n], n);
      pushAnn += newAnnouncement;
    });
    this.notificationSection.innerHTML = '';
    this.notificationSection.innerHTML = pushAnn;
    let els: Array<any> = this.geci('del-ann-button');
    els.forEach(function (e) {
      e.onclick = this.deleteNotifications.bind(this, e);
    }, this);
  }

}
