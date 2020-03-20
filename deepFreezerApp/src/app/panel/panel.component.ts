import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeneralService } from '../general.service';
import { Observable } from 'rxjs';
import { ToggleComponent } from '../toggle/toggle.component';
import { State } from '../state';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  @ViewChild('connStr', { static: true }) public connStr: ElementRef<HTMLDivElement>;
  @ViewChild('togg1', { static: true }) public togg1: ToggleComponent;

  sub: Observable<any>;
  stateInterval: any = null;
  stateCheck = false;

  constructor(
    private general: GeneralService
  ) { }

  ngOnInit() {
    this.stateInterval = setInterval(() => {
      if (!this.stateCheck) {
        this.getState();
      }
    }, 5000);
  }

  getState() {
    try {
      this.stateCheck = true;
      this.sub = this.general.getState();
      const thisSub = this.sub.subscribe((res: State) => {
        this.connStr.nativeElement.innerText = 'Connected';
        this.connStr.nativeElement.classList.remove('text-danger');
        this.connStr.nativeElement.classList.add('text-success');
        if (res.state === 0) {
          this.togg1.turnOff();
        } else {
          this.togg1.turnOn();
        }
        this.stateCheck = false;
        thisSub.unsubscribe();
      });
    } catch (exc) {
      this.getState();
    }
  }

}
