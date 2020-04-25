import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  @ViewChild('toggle', { static: true }) toggle: MatSlideToggle;

  @Input() name: string;

  state = false;

  constructor(
    private messages: MessagesService
  ) { }

  ngOnInit() {
  }

  setChanged = ($e: MatSlideToggleChange) => {
    this.state = $e.checked;

    const { name, state } = this;
    this.messages.changeObject({
      topic: 'switch-toggled',
      message: {
        name,
        state
      }
    })
  }

  toggleState = () => this.toggle.toggle();
}
