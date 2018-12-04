import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import * as $ from 'jquery';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  public icons = [
    'home',
    'place',
    'ac_unit',
    'airport_shuttle',
    'beach_access',
    'business_client',
    'casino',
    'child_care',
    'child_friendly',
    'fitness_center',
    'free_breakfast',
    'golf_course',
    'hot_tub',
    'kitchen',
    'meeting_room',
    'pool',
    'rv_hookup',
    'domain',
    'location_city',
    'school'
  ];

  private getKey(el, it) {
    const e = el[it.toString()];
    it++;
    if ($(e).hasClass('get-key-from-icon')) {
      return e.id;
    } else {
      return (this.getKey(el, it));
    }
  }

  constructor(private dialogRef: MatDialogRef<IconsComponent>) { }
  ngOnInit() {
  }


  selectIcon($e, t) {
    const iterator = 0;
    const key = this.getKey($e.path, iterator);
    this.dialogRef.close(key);
  }
}
