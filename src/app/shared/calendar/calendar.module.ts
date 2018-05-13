import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarUtilsModule } from './calendar-utils/calendar-utils.module';
import { CalendarComponent } from './calendar.component';
import { CalendarModule } from 'angular-calendar';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(),
    CalendarUtilsModule
  ],
  declarations: [CalendarComponent],
  exports: [CalendarComponent]
})
export class HRMCalendarModule { }
