import { FlexLayoutModule, } from '@angular/flex-layout';
import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { CalendarHeaderComponent, } from './calendar-header/calendar-header.component';
import { CalendarModule, } from 'angular-calendar';
import { MaterialModule, } from '../material.module';
import { CalendarHeaderService } from './calendar-header.service';

@NgModule({
  imports: [
		CommonModule,
		CalendarModule,
		MaterialModule,
		FlexLayoutModule,
  ],
  declarations: [CalendarHeaderComponent, ],
  exports: [CalendarHeaderComponent, ],
  providers: [CalendarHeaderService],
})
export class CalendarUtilsModule { }
