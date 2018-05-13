import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule
  ],
  declarations: [CalendarHeaderComponent],
  exports: [CalendarHeaderComponent]
})
export class CalendarUtilsModule { }
