import { Component, OnInit, ViewChild } from '@angular/core';
import { InspectionsService } from '../inspections.service';
import { TemplatesService } from '../templates.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.css']
})

export class InspectionsComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource: any = new MatTableDataSource([]);
  showInspectionsCount = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  constructor(private inspectionService: InspectionsService, private templatesService: TemplatesService) { }

  ngOnInit() {
    this.setInspections();
    // tslint:disable-next-line:max-line-length
    this.displayedColumns = ['date', 'inspectors', 'service', 'inspectionTime', 'inspectionDuration', 'address', 'zipcode', 'client', 'actions'];
    this.dataSource.paginator = this.paginator;
  }

  showInspections($e) {
    this.showInspectionsCount = $e.value;
  }

  setInspections() {
    this.inspectionService.getInspections(this.getCookie('access_token'), this.showInspectionsCount).subscribe(arr => {
      const newMap = arr.message.map(i => {
        let constDate = new Date('2018-12-06T18:19:28.667Z'.split('T')[0]).toString();
        const useDate = constDate.split(' ');
        i.template = {};
        i.date = useDate[0] + ', ' + useDate[1] + ' ' + useDate[2] + ' ' + useDate[3];
        this.templatesService.getTemplate(this.getCookie('access_token'), i.service).subscribe(msg => {
          i.template = msg.message;
        });
      });
      this.dataSource = new MatTableDataSource(arr.message);
      this.dataSource.paginator = this.paginator;
    });
  }

}

