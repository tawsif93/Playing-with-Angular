import { Injectable } from '@angular/core';
import { Student } from './student';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const storageKey = 'students';
@Injectable()
export class StudentService {


  constructor() { }
  private ELEMENT_DATA: Student[] ;

  getStudents(): Observable<Student[]> {

    this.ELEMENT_DATA = JSON.parse(localStorage.getItem(storageKey));
    if (!this.ELEMENT_DATA ) {
      this.ELEMENT_DATA = [];
    }

    return of(this.ELEMENT_DATA);
  }

  getStudentDetail(id: number): Observable<Student> {
    const student: Student = this.ELEMENT_DATA[id];
    return of(student);
  }

  addStudent(student: Student): void {
    this.ELEMENT_DATA.push(student);

    this.store();
  }

  deleteStudent(id: number): void {
    this.ELEMENT_DATA.splice(id, 1);

    this.store();
  }

  store(): void {
    localStorage.setItem(storageKey, JSON.stringify(this.ELEMENT_DATA));
  }
}




