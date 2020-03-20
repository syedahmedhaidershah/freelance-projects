import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();
  createExamControls = false;
  showHeader = false;
  showSearchBar = true;
  navbarToShowControls = [
    '/create-new-exam',
    '/edit-exam'
  ];
  hideHeaderRoutes = [
    '',
    '/'
  ];
  showExamRoutes = [
    '/exams'
  ];
  hideIndpendentContol = [
    '/edit-exam'
  ];
  onEditExam = [
    '/edit-exam'
  ];

  constructor(
    private router: Router,
    private messages: MessagesService
  ) { }

  ngOnInit() {

    const stateRoute = localStorage.getItem('on-route');
    if (this.router.url !== stateRoute && stateRoute) {
      this.router.navigate([stateRoute.replace(/\//g, '')]);
    }

    this.messages.currentMessage.pipe(takeUntil(this.unsubscribe))
      .subscribe(msg => {
        switch (msg) {
          case 'hide-all':
            this.createExamControls = false;
            break;
          default:
            break;
        }
      });

    this.router.events.pipe(takeUntil(this.unsubscribe)).subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        const useUrl = (ev.url.indexOf('?') === -1) ? ev.url : ev.url.split('?')[0];

        this.showHeader = (this.hideHeaderRoutes.includes(useUrl)) ? false : true;
        this.showSearchBar = (this.showExamRoutes.includes(useUrl)) ? true : false;

        localStorage.setItem('on-route', useUrl);

        if (this.navbarToShowControls.includes(useUrl)) {
          this.messages.changeMessage('show-controls');
          this.createExamControls = true;
        } else {
          this.messages.changeMessage('hide-controls');
          this.createExamControls = false;
        }

        if (this.hideIndpendentContol.includes(useUrl)) {
          this.messages.changeMessage('hide-independent-controls');
        } else {
          this.messages.changeMessage('show-independent-controls');
        }

        if (this.onEditExam.includes(useUrl)) {
          this.messages.changeMessage('on-edit-exam');
        } else {
          this.messages.changeMessage('off-edit-exam');
        }
      }
    });
    this.setListeners();
    // this.router.url.subscribe((r: Array<UrlSegment>) => {
    //   this.showHeader = (r[0].path === '') ? false : true;
    //   console.log(this.showHeader, r[0].path);
    // });
  }

  setListeners() {
  }

  alert() {
    alert('my name is haider');
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
