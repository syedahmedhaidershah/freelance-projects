import { Component, OnInit, Input } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-discrete-slider',
  templateUrl: './discrete-slider.component.html',
  styleUrls: ['./discrete-slider.component.css']
})
export class DiscreteSliderComponent implements OnInit {

  percentage = 0;
  currentVal = 0;

  @Input() name: string;
  @Input() states: number;

  constructor(
    private messages: MessagesService
  ) { }

  ngOnInit() {
  }

  setPercentage = (p: number) => {
    this.currentVal = p;
    this.percentage = (p / this.states) * 100;
  }

  increase = () => {
    this.currentVal = (this.currentVal < this.states) ? this.currentVal + 1 : this.currentVal;

    this.setPercentage(this.currentVal);

    const { name, currentVal, percentage, states } = this;

    this.messages.changeObject({
      topic: 'state-changed',
      message: {
        name,
        currentVal,
        percentage,
        states
      }
    })
  }

  decrease = () => {
    this.currentVal = (this.currentVal > 0) ? this.currentVal - 1 : 0;

    this.setPercentage(this.currentVal);

    const { name, currentVal, percentage, states } = this;

    this.messages.changeObject({
      topic: 'state-changed',
      message: {
        name,
        currentVal,
        percentage,
        states
      }
    })
  }
}
