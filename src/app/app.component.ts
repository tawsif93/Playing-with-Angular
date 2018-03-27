import { Component, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {MatTableDataSource, MatSort} from '@angular/material';
import { Student } from './student/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'app';
  dataSource: MatTableDataSource<Student>;
  // @ViewChild(MatSort) sort: MatSort;

  // public modalRef: BsModalRef;
  // constructor(private modalService: BsModalService) {}

  // public openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template);
  // }
}
