import { FlexLayoutModule, } from '@angular/flex-layout';
import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { CalendarHeaderComponent, } from './calendar-header/calendar-header.component';
import { CalendarModule, } from 'angular-calendar';
import { MaterialModule, } from '../material.module';
import { CalendarHeaderService, } from './calendar-header.service';
import { MonthPickerComponent, } from './month-picker/month-picker.component';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { MatMomentDateModule, } from '@angular/material-moment-adapter';

@NgModule({
	imports: [
		CommonModule,
		CalendarModule,
		MaterialModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		MatMomentDateModule,
	],
	declarations: [CalendarHeaderComponent, MonthPickerComponent, ],
	exports: [CalendarHeaderComponent, MonthPickerComponent, ],
	providers: [CalendarHeaderService, ],
})
export class CalendarUtilsModule { }
