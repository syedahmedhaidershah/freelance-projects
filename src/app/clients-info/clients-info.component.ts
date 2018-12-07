import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from '../clients.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-clients-info',
  templateUrl: './clients-info.component.html',
  styleUrls: ['./clients-info.component.css']
})
export class ClientsInfoComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource: any = new MatTableDataSource([]);

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

  setClients() {
    this.clientService.getClients(this.getCookie('access_token')).subscribe(res => {
      const arr = res.message;
      console.clear();
      console.log(arr);
      this.dataSource = new MatTableDataSource(arr);
      this.dataSource.paginator = this.paginator;
    });
  }

  constructor(private clientService: ClientsService) { }

  ngOnInit() {
    this.setClients();
    // tslint:disable-next-line:max-line-length
    this.displayedColumns = ['firstname', 'lastname', 'phone', 'email', 'actions'];
    this.dataSource.paginator = this.paginator;
  }

}
