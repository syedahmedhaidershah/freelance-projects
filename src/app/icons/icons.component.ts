import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
