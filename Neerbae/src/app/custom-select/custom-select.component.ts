import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent implements OnInit {
  @Input() name: string;
  @Input() array: Array<any>;
  @Input() current: string | number;

  @ViewChild('selectEl', { static: true }) selectEl: ElementRef<HTMLSelectElement>;

  constructor(
    private sanitizer: DomSanitizer,
    private messages: MessagesService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.launch();
      this.setListeners();
    }, 300);
  }

  setListeners() {
    this.selectEl.nativeElement.onchange = () => {
      this.launch();
    };
  }

  launch() {
    this.messages.changeMessage('fetch-calender-details');
  }

  get selectStyle() {
    if (this.name.toLowerCase() === 'month') {
      return this.sanitizer.bypassSecurityTrustStyle('width: 150px');
    } else {
      return this.sanitizer.bypassSecurityTrustStyle('width: 120px');
    }
  }

  get selected() {
    return this.selectEl.nativeElement.value;
  }

}
