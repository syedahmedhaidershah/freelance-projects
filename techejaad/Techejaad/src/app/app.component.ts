import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();

  showHeader = true;
  // hideHeaderRoutes = [
  //   '/'
  // ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    this.router.events
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(ev => {
        if (ev instanceof NavigationEnd) {
          const useUrl = (ev.url.indexOf('?') === -1) ? ev.url : ev.url.split('?')[0];

          // this.showHeader = !(this.hideHeaderRoutes.includes(useUrl));
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
