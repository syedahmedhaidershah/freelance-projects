import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as io from 'socket.io-client';
import { GetterService } from '../getter.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  voltageChart: any = [];
  timeSetsArray = [];
  voltagesArray = [];
  voltage = 0;
  ampere = 0;
  init = false;
  limit = 1000;
  socket: SocketIOClient.Socket;
  loadingVoltage = false;

  setVoltageCanvas(res) {
    this.loadingVoltage = true;

    const timeLabels = [], voltagesTemp = [];
    let iterator = 0;

    res.forEach(m => {
      if (iterator % 5) {
        if (!(this.init)) {
          if (!(this.timeSetsArray.includes(m.time))) {
            this.timeSetsArray.push(m.time);
            this.voltagesArray.push(m.voltage);
          }
        } else {
          if (!(timeLabels.includes(m.time))) {
            if (this.init) {
              timeLabels.splice(0, 5);
            }
            timeLabels.push(m.time);
            if (this.init) {
              voltagesTemp.splice(0, 5);
            }
            voltagesTemp.push(m.voltage);
          }
        }
      }
      iterator++;
    });

    if (!(this.init)) {
      this.voltageChart = new Chart('voltageCanvas', {
        type: 'line',
        data: {
          labels: this.timeSetsArray,
          datasets: [
            {
              pointRadius: 0,
              pointBackgroundColor: '#0089cf',
              // backgroundColor: '#008800',
              data: this.voltagesArray,
              fill: false,
              borderColor: '#008800',
              borderWidth: 1
            }
          ]
        },
        options: {
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time (timestamp)'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Voltage (V)'
              },
              ticks: {
                beginAtZero: true,
                callback: function (value) { if (Number.isInteger(value)) { return value; } },
                // stepSize: 1
              }
            }]
          }
        }
      });
    } else {
      this.voltageChart.data.labels.push(timeLabels);
      this.voltageChart.data.datasets.forEach((dataset) => {
        dataset.data.push(voltagesTemp);
      });
      this.voltageChart.update();
    }
    this.loadingVoltage = false;
    this.init = true;
  }

  constructor(private getter: GetterService, private matSnackBar: MatSnackBar) {
    this.socket = io('http://localhost:9898');
  }

  setSocketListeners() {
    this.socket.on('message', (data) => {
      const changed = data.changed;
      switch (data.op) {
        case 'insert':
          this[changed].push(data.doc);
          break;
        case 'delete':
          this[changed].map((n, index) => {
            if (n._id === data.key._id) {
              this[changed].splice(index, 1);
            }
          });
          break;
        case 'update':
          this[changed].map(n => {
            if (n._id === data.key._id) {
              const updated = data.update.updatedFields;
              Object.keys(updated).forEach(f => {
                n[f] = updated[f];
              });
            }
          });
          break;
        default:
          break;
      }
    });
  }

  ngOnInit() {
    this.setSocketListeners();
    setInterval(() => {
      if (this.init) {
        this.limit = 100;
      }
      if (!(this.loadingVoltage)) {
        this.getter.getRecentVoltages(this.limit).subscribe(data => {
          if (data.error) {
            this.matSnackBar.open('An error occured retreiving voltages', 'close');
          } else {
            this.setVoltageCanvas(data.message);
          }
        });
      }
    }, 1000);
  }

}
