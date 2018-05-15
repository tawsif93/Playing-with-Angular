import { FlexLayoutModule, } from '@angular/flex-layout';
import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { CalendarUtilsModule, } from './calendar-utils/calendar-utils.module';
import { CalendarComponent, } from './calendar.component';
import { CalendarModule, } from 'angular-calendar';
import { CalendarService } from './calendar.service';

@NgModule({
  imports: [
	  CommonModule,
  	CalendarModule.forRoot(),
  	CalendarUtilsModule,
    FlexLayoutModule,
  ],
  declarations: [CalendarComponent, ],
  exports: [CalendarComponent ],
  providers: [CalendarService],
})
export class HRMCalendarModule { }
