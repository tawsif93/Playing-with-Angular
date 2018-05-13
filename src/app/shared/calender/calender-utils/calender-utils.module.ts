import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'angular-calendar';
import { CalenderHeaderComponent } from './calender-header/calender-header.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule
  ],
  declarations: [CalenderHeaderComponent],
  exports: [CalenderHeaderComponent]
})
export class CalenderUtilsModule { }
