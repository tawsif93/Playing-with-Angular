import { Component, OnInit, ViewEncapsulation, } from '@angular/core';
import { CalendarEvent, } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss', ],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {

  view = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  constructor() { }

  ngOnInit() {
  }
}
