import { StudentService } from './../student.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Student } from '../student';

import {MatTableDataSource, MatSort, MatSortHeaderIntl, MatPaginator, MatDialog, ErrorStateMatcher} from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns: any = ['position', 'name', 'weight', 'symbol'];
  public dataSource;

  option: any = {
    search: false
  };

  constructor(private studentService: StudentService, private sortHeaderService: MatSortHeaderIntl, public dialog: MatDialog ) { }

  ngOnInit() {
    this.getStudentList();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getStudentList(): void {
    this.studentService.getStudents().subscribe(data => this.dataSource = new MatTableDataSource(data)) ;
  }

  addStudent(): void {
    this.openDialog();
  }

  getPaginatorPageSize(): number[] {
    return new Array(5, 10, 15);
  }

  pageChange(event: any): void {
    console.log(event);
  }

  openDialog() {
    const dialogRef = this.dialog.open(StudentListDialogComponent, {
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

@Component({
  selector: 'app-student-list-dialog',
  templateUrl: 'student-list-dialog.html',
})
export class StudentListDialogComponent {
  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
