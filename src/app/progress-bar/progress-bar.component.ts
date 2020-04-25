import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  @Input() public percentage: string;
  @Input() public color: string;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  get getProgressStyle() {
    return this.sanitizer.bypassSecurityTrustStyle(`transition: width 300ms; background-color: ${this.color}; width: ${this.percentage}%;`);
  }

}
