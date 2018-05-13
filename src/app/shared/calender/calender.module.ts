import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalenderComponent } from './calender.component';
import { CalendarModule } from 'angular-calendar';
import { CalenderUtilsModule } from './calender-utils/calender-utils.module';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot(),
    CalenderUtilsModule
  ],
  declarations: [CalenderComponent],
  exports: [CalenderComponent]
})
export class CalenderModule { }
