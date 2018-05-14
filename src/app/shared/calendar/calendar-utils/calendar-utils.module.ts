import { FlexLayoutModule, } from '@angular/flex-layout';
import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { CalendarHeaderComponent, } from './calendar-header/calendar-header.component';
import { CalendarModule, } from 'angular-calendar';
import { MaterialModule, } from '../material.module';

@NgModule({
  imports: [
		CommonModule,
		CalendarModule,
		MaterialModule,
		FlexLayoutModule,
  ],
  declarations: [CalendarHeaderComponent, ],
  exports: [CalendarHeaderComponent, ],
})
export class CalendarUtilsModule { }
