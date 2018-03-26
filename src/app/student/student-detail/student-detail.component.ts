import { Student } from './../student';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  public student: Student;

  constructor(private location: Location,
              private route: ActivatedRoute,
              private service: StudentService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getStudentDetail(id).subscribe(student => this.student = student);
  }

}
