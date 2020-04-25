import { Component, OnInit, isDevMode } from '@angular/core';
import { MessagesService } from '../messages.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  prompts = {
    objHandler: 'An unhandled exception occured. Please contact support'
  }

  private unsubscribe = new Subject();

  switchesPresent = [
    { name: 'Switch 1' },
    { name: 'Switch 2' },
    { name: 'Switch 3' }
  ]

  sliders = [
    { name: 'Fan 1', states: 4 },
  ]

  constructor(
    private messages: MessagesService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.messages.currentObj
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(this.objHandler);

    this.loadState();
  }

  objHandler = (obj: any) => {
    try {
      const useObj = JSON.parse(obj);
      if (useObj.topic) {
        const { topic } = useObj;
        switch (topic) {
          case 'switch-toggled':
            this.swtichHandler(useObj);
            break;
          case 'state-changed':
            this.sliderHandler(useObj);
            break;
          default:
            break;
        }
      }
    } catch (exc) {
      if (isDevMode()) console.warn(exc);
      this.snackbar.open(
        this.prompts.objHandler,
        'close', { duration: 3000 }
      )
    }
  }

  swtichHandler = (useObj: any) => {
    const { topic, message: { name: swName, state: swState } } = useObj;
    // PUT your API calls here, remove the snackbar/toast
    this.snackbar.open(`${swName} has been toggled to state ${swState ? 'on' : 'off'}`, 'close', { duration: 500 });
  }

  sliderHandler = (useObj: any) => {
    const { topic, message: { name: sLname, currentVal: sLcurrentVal, percentage: sLpercentage, states: sLstates } } = useObj;
    // PUT your API calls here, remove the snackbar/toast
    if (sLcurrentVal) {
      this.snackbar.open(`${sLname} has been slided to speed ${sLcurrentVal}`, 'close', { duration: 500 });
    } else {
      this.snackbar.open(`${sLname} has been turned off`, 'close', { duration: 500 });
    }
  }

  loadState = () => {
    this.messages.loadedState([
      this.constructor.name.split('Component')[0].toLowerCase()
    ]);
  }

}
