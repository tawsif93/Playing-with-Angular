import { CalenderHeaderComponent } from './calender-utils/calender-header/calender-header.component';
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  view = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  constructor() { }

  ngOnInit() {
  }

}
