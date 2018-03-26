import { StudentService } from './../student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  public displayedColumns: any = ['position', 'name', 'weight', 'symbol'];
  public dataSource: Student[];

  constructor(private studentService: StudentService ) { }

  ngOnInit() {
    this.getStudentList();
  }

  getStudentList(): void {
    this.studentService.getStudents().subscribe(data => this.dataSource = data) ;
  }
}

