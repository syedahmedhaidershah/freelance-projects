import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SqliteService } from '../sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  initialized = false;
  coords: any = {
    latitutde: 0,
    longitude: 0
  };

  constructor(
    private sqlite: SqliteService,
    private geolocation: Geolocation
  ) { }

  initGeoLoc() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.initialized = true;
      this.coords = resp.coords;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log('location updated');
      this.coords = data.coords;
    });
  }

  initDB() {
    this.sqlite.init();
  }

  ngOnInit() {
    this.initGeoLoc();
    this.initDB();
  }

  ngAfterViewInit() {
    // setInterval(() => {
    //   console.clear();
    //   console.log(this.sqlite);
    // }, 200);
  }

}
