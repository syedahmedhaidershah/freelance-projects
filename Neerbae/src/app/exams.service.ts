import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArrObjRes } from './arr-obj-res';
import { Observable } from 'rxjs';
import { Exam } from './exam';
import { isNumber } from 'util';
import { ObjRes } from './obj-res';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  defaultExamLimit: 50;
  defaultExamPage: 50;

  constructor(
    private http: HttpClient
  ) { }

  create(obj: any) {
    return this.http.post<ArrObjRes>(
      'exam/form',
      obj
    );
  }

  getExams(m: number, y: string) {
    return this.http.post<ArrObjRes>(
      'exam/calender',
      {
        month: (m + 1).toString(),
        year: y
      }
    );
  }

  getExamsByType(type) {
    let retObservable: Observable<any>;
    let route = 'exam/';
    route = route.concat(type);
    retObservable = this.http.post<ArrObjRes>(
      route,
      {}
    );
    return retObservable;
  }

  getEmptyExam() {
    const exam: Exam = {
      autoShuffle: false,
      deleted: false,
      description: '',
      endDate: new Date(),
      examCode: '',
      examColor: '',
      examTitle: '',
      googleId: JSON.parse(localStorage.getItem('TEMP_USER_PROF')).id,
      schoolYear: '',
      schoolLevel: [],
      startDate: '',
      tags: null,
      tools: null,
      status: 0,
      subject: '',
      topic: '',
      __v: 0,
      _id: null,
    };
    return exam;
  }

  getCount() {
    return this.http.post<any | Array<any>>('exam/count', {});
  }

  getAll(limit?: number, pageNumber?: number) {
    const useBody = (isNumber(limit) && isNumber(pageNumber)) ? { limit, pageNumber } :
      (limit) ? { limit } : {};
    return this.http.post<any>(
      'exam/getall',
      useBody
    );
  }

  getDetails(params: object) {
    return this.http.post<any>(
      'exam/examDetail',
      params
    );
  }

  update(params: object) {
    return this.http.post<any>(
      'exam/update',
      params
    );
  }
}
