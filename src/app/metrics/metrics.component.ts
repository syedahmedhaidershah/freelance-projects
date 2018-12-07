import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../metrics.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

  inspectionChart: any = [];
  referalChart: any = [];

  private getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  constructor(private metricsService: MetricsService) { }

  setInspectionsCanvas(res) {
    const message = res.message;
    const scores = message.map(r => r.inspections);

    let inspectionMonths = [];
    message.forEach(m => {
      if (!inspectionMonths.includes(m.month)) {
        inspectionMonths.push(m.month);
      }
    });

    this.inspectionChart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: inspectionMonths,
        datasets: [
          {
            data: scores,
            borderColor: '#27a9cf',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              callback: function (value) { if (Number.isInteger(value)) { return value; } },
              stepSize: 1
            }
          }]
        }
      }
    });
  }

  setReferalsCanvas(res) {
    const message = res.message;
    const scores = message.map(r => r.referals);

    let referalTypes = [];
    message.forEach(m => {
      if (!referalTypes.includes(m.name)) {
        referalTypes.push(m.name);
      }
    });

    this.inspectionChart = new Chart('pieCanvas', {
      type: 'doughnut',
      data: {
        labels: referalTypes,
        datasets: [
          {
            data: scores,
            borderColor: ['#0089cf', '#27c9cf', '#a50101'],
            backgroundColor: ['#0089cf', '#27c9cf', '#a50101'],
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: true,
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: false,
              callback: function (value) { if (Number.isInteger(value)) { return value; } },
              stepSize: 1
            }
          }]
        }
      }
    });
  }

  ngOnInit() {
    this.metricsService.getInspectionMetrics(this.getCookie('access_token')).subscribe(res => {
      this.setInspectionsCanvas(res);
    });

    this.metricsService.getReferalMetrics(this.getCookie('access_token')).subscribe(res => {
      this.setReferalsCanvas(res);
    });
  }

}
