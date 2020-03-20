import { Component, OnInit } from '@angular/core';
import { GeneralService } from './general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private general: GeneralService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.general.hideLoader();
    }, this.general.loadTime);
  }
}
