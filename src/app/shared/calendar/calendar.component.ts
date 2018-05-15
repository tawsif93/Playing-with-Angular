import { CalendarHeaderService } from './calendar-utils/calendar-header.service';
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnDestroy, AfterViewInit } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, } from 'angular-calendar';
import { Subject, Subscription, } from 'rxjs';
import { MonthViewDay } from 'calendar-utils';
import { isSameMonth, isSameDay, subDays, addDays, startOfDay, addHours, endOfMonth } from 'date-fns';
import { CalendarService } from './calendar.service';
import { CalendarEventModel } from './models/event.model';
import { ICalendarConfiguration } from './models/calendar.model';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss', ],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {

  view: string;

  viewDate: Date ;

  activeDayIsOpen: boolean;
  selectedDay: any;

  refreshSubscription: Subscription;
  headerNextSubscription: Subscription;
  headerPrevioushSubscription: Subscription;
  headerTodaySubscription: Subscription;

  constructor(public calendarService: CalendarService, public calendarHeaderService: CalendarHeaderService) {
    this.calendarConfiguration = this.calendarConfiguration || { } as ICalendarConfiguration;
    this.view = this.calendarConfiguration.View || 'month';
    this.viewDate = new Date();
    this.activeDayIsOpen = true;
    this.selectedDay = {date: startOfDay(new Date())};
  }


  @Input()
  calendarConfiguration: ICalendarConfiguration;

  /**
   * Called when the day cell is clicked
   */
  @Output()
  previousClick = new EventEmitter<{
    date: Date,
    view: string
  }>();

    /**
   * Called when the day cell is clicked
   */
  @Output()
  nextClick = new EventEmitter<{
    date: Date,
    view: string
  }>();

    /**
   * Called when the day cell is clicked
   */
  @Output()
  todayClick = new EventEmitter<{
    date: Date,
    view: string
  }>();

  /**
   * Called when the day cell is clicked
   */
  @Output()
  dayClicked = new EventEmitter<{
    date: Date,
    events: CalendarEvent[];
  }>();

  /**
   * Called when the event title is clicked
   */
  @Output()
  eventClicked = new EventEmitter<{
    event: CalendarEvent;
  }>();


  events: CalendarEvent[];
  // [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 5),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     // actions: this.actions
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     // actions: this.actions
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     // actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];


  ngOnInit() {
    if (this.calendarService.refreshEvent) {
      this.refreshSubscription = this.calendarService.refreshEvent.subscribe((event: CalendarEvent) => {
        if (event) {
          this.events.push(event);
          this.logEvent(event);
        }
      });
    }

    if (this.calendarHeaderService.calendarNext) {
      this.headerNextSubscription = this.calendarHeaderService.calendarNext.subscribe(() => {
        this.nextClick.emit({date: this.selectedDay.date , view : this.view});
      });
      this.headerPrevioushSubscription = this.calendarHeaderService.calendarPrevious.subscribe(() => {
        this.previousClick.emit({date: this.selectedDay.date , view : this.view});
      });
      this.headerTodaySubscription = this.calendarHeaderService.calendarToday.subscribe(() => {
        this.todayClick.emit({date: this.selectedDay.date , view : this.view});
      });
    }

    if (this.calendarConfiguration && this.calendarConfiguration.Events) {
      this.setEvents();
    }
  }

  ngAfterViewInit() {
    // this.setEvents();
  }

  setEvents(): void {
    this.events = this.calendarConfiguration.Events.map( (event: CalendarEventModel) => {
      // event.cssClass = 'cal-event-background';
      return new CalendarEventModel(event);
    });
    // this.calendarService.refreshEvent.next();
  }

  onDayClicked(day: CalendarMonthViewDay): void {
    const date: Date = day.date;
    const events: CalendarEvent[] = day.events;

    if ( isSameMonth(date, this.viewDate) ) {
        if ( (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0 ) {
            this.activeDayIsOpen = false;
        } else {
            this.activeDayIsOpen = true;
            this.viewDate = date;
        }
    }
    this.selectedDay = day;
    this.calendarService.refresh();
    this.dayClicked.emit({ date, events});
  }

  onEventClicked(action: string, event: CalendarEvent): void {
    this.eventClicked.emit({event});
    this.logEvent(event);
  }

  onViewChange(view: string) {
    this.view = view;
  }

  beforeMonthViewRender({header, body}) {
      const _selectedDay = body.find((_day) => {
          return _day.date.getTime() === this.selectedDay.date.getTime();
      });

      if ( _selectedDay ) {
          /**
           * Set selectedday style
           * @type {string}
           */
          _selectedDay.cssClass = 'mat-elevation-z3';
      }

      // body.map( (_day) => {
      //   if (_day.events.length > 0) {
      //     _day.cssClass = `{ "color": $calendarConfiguration.DefaultEventBackgroundColor}`;
      //   }
      // });
  }

  logEvent(lol) {
    console.log(lol);
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
    if (this.headerNextSubscription) {
      this.headerNextSubscription.unsubscribe();
    }
    if (this.headerPrevioushSubscription) {
      this.headerPrevioushSubscription.unsubscribe();
    }
    if (this.headerTodaySubscription) {
      this.headerTodaySubscription.unsubscribe();
    }
  }

}
