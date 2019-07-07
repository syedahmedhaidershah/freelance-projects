import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllotteesService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.post<any>('/allottees/getall', {});
  }

  getAllUnallotted() {
    return this.http.post<any>('/allottees/getallunallotted', {});
  }

  updateFileBalance(data) {
    return this.http.post<any>('/allottees/updatefilebalace', data);
  }

  getFileData(data) {
    return this.http.post<any>('/allottees/getfiledata', data);
  }

  updateFileAllottee(data) {
    return this.http.post<any>('/allottees/updatefiledata', data);
  }

  allotFile(data) {
    return this.http.post<any>('/allottees/allotfile', data);
  }

  changePlotOnFile(data) {
    return this.http.post<any>('/allottees/changeplotonfile', data);
  }

  updateFileNew(data) {
    return this.http.post<any>('/allottees/updatefilenew', data);
  }

  receivePayment(data) {
    return this.http.post<any>('/allottees/receivepayment', data);
  }

  transferFile(data) {
    return this.http.post<any>('/allottees/transferfile', data);
  }

  adjustFile(data) {
    return this.http.post<any>('/allottees/adjustfile', data);
  }

  getLastDOP(data) {
    return this.http.post<any>('/allottees/lastdop', data);
  }

  getLastDOA(data) {
    return this.http.post<any>('/allottees/dateofallotment', data);
  }

  getAllTransfers() {
    return this.http.post<any>('/allottees/getalltransfers', {});
  }

  refundFile(data) {
    return this.http.post<any>('/allottees/refundfile', data);
  }

  getAllRefunds() {
    return this.http.post<any>('/allottees/getallrefunds', {});
  }

  getAllAdjustments() {
    return this.http.post<any>('/allottees/getalladjustments', {});
  }

  backupDatabase() {
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/javascript; charset=UTF-8');
    // let options = {
    //   responseType: 'blob',
    //   headers: headers,
    // };
    return this.http.post('/allottees/backupdatabase', {}, { responseType: 'text' });
  }
  
  importDatabase(file) {
    return this.http.post('/allottees/importdatabase', file);
  }
}
