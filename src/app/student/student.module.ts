import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { StudentService } from './student.service';

const materials = [MatCardModule, MatTableModule , MatToolbarModule, MatIconModule];

@NgModule({
  imports: [
    CommonModule,
    materials
  ],
  declarations: [StudentListComponent, StudentDetailComponent],
  exports : [],
  providers: [StudentService]
})
export class StudentModule { }
