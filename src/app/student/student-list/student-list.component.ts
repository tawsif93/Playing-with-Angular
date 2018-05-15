import { ICalendarConfiguration, CalendarViews } from './../../shared/calendar/models/calendar.model';
import { CalendarService } from './../../shared/calendar/calendar.service';
import { FormTextbox } from './../../shared/tuForms/dynamic-form/form-textbox';
import { FormBase } from './../../shared/tuForms/dynamic-form/form-base';
import { StudentService } from './../student.service';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Student } from '../student';

import {MatTableDataSource, MatSort, MatSortHeaderIntl, MatPaginator, MatDialog, ErrorStateMatcher, MatButton} from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { CalendarEventModel } from '../../shared/calendar/models/event.model';
import { subDays, addDays, startOfDay, addHours, endOfMonth } from 'date-fns';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
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


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('openButton') openDialogButton: MatButton;

  public displayedColumns: any = ['position', 'name', 'weight', 'symbol'];
  public dataSource;
  questions: FormBase<any>[] = [

    // new DropdownQuestion({
    //   key: 'brave',
    //   label: 'Bravery Rating',
    //   options: [
    //     {key: 'solid',  value: 'Solid'},
    //     {key: 'great',  value: 'Great'},
    //     {key: 'good',   value: 'Good'},
    //     {key: 'unproven', value: 'Unproven'}
    //   ],
    //   order: 3
    // }),

    new FormTextbox({
      key: 'firstName',
      label: 'First name',
      value: 'Bombasto',
      required: true,
      order: 1
    }),

    new FormTextbox({
      key: 'emailAddress',
      label: 'Email',
      type: 'email',
      order: 2
    })
  ];

  option: any = {
    search: false
  };

  configuration: ICalendarConfiguration = {
    Events: [
        {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 5),
      title: 'A 3 day event',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      },
      // actions: this.actions
    }as CalendarEventModel,
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      },
      // actions: this.actions
    }as CalendarEventModel,
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      }
    }as CalendarEventModel,
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      },
      // actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    } as CalendarEventModel
    ] as [CalendarEventModel],
    Title: 'Student Calendar',
    DefaultEventBackgroundColor: '#d82fbc',
    View: CalendarViews.Month,
    ActiveWeekViewButton: true
  };

  constructor(private studentService: StudentService, private sortHeaderService: MatSortHeaderIntl, public dialog: MatDialog,
    public calService: CalendarService ) { }

  ngOnInit() {
    this.getStudentList();
    this.calService.addEvent(new CalendarEventModel());
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
      this.openDialogButton._elementRef.nativeElement.classList.remove('cdk-program-focused');
      this.openDialogButton._elementRef.nativeElement.classList.add('cdk-mouse-focused');
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
