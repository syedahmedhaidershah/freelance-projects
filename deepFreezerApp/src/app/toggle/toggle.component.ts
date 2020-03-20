import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { GeneralService } from '../general.service';
import { Observable } from 'rxjs';
import { State } from '../state';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  @ViewChild('tContainer', { static: true }) public tContainer: ElementRef<HTMLDivElement>;
  @Input() name: string;

  sub: Observable<any>;

  constructor(
    private general: GeneralService
  ) { }

  ngOnInit() {
  }

  cap(str) {
    return str.split('-').map((word: string) => word.substring(0, 1).toUpperCase().concat(word.substring(1))).join('-');
  }

  turnOn() {
    this.tContainer.nativeElement.classList.add('active');
  }

  turnOff() {
    this.tContainer.nativeElement.classList.remove('active');
  }

  trigger() {
    {
      try {
        this.sub = this.general.trigger();
        const thisSub = this.sub.subscribe((res: State) => {
          if (res.state === 0) {
            this.turnOff();
          } else {
            this.turnOn();
          }
          thisSub.unsubscribe();
        });
      } catch (exc) {
        this.trigger();
      }
    }
  }

}
