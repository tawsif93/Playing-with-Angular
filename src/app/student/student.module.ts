import { CalendarModule } from 'angular-calendar';
import { CalenderComponent } from './../shared/calender/calender.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent, StudentListDialogComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {  MatSortModule, MatSortHeaderIntl, MatPaginatorModule, MatInputModule, MatDialogModule } from '@angular/material';
import { StudentService } from './student.service';
import { SharedModule } from '../shared/shared.module';
import { CalenderModule } from '../shared/calender/calender.module';

const materials = [MatCardModule, MatTableModule , MatToolbarModule, MatIconModule, MatSortModule, MatPaginatorModule , MatInputModule,
                   MatButtonModule, MatDialogModule];

@NgModule({
  imports: [
    CommonModule,
    materials,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CalenderModule
  ],
  declarations: [StudentListComponent, StudentDetailComponent, StudentListDialogComponent],
  entryComponents: [StudentListDialogComponent],
  exports : [],
  providers: [StudentService, MatSortHeaderIntl]
})
export class StudentModule { }
