import { ICalendarDataModel, } from './models/calendar-data.model';
import { CalendarHeaderService, } from './calendar-utils/calendar-header.service';
import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnDestroy, AfterViewInit, } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, } from 'angular-calendar';
import { Subject,  } from 'rxjs/Subject';
import { Subscription, } from 'rxjs/Subscription';
import { MonthViewDay, } from 'calendar-utils';
import { isSameMonth, isSameDay, subDays, addDays, startOfDay, addHours, endOfMonth, addMonths, subMonths, isThisSecond, } from 'date-fns';
import { CalendarService, } from './calendar.service';
import { CalendarEventModel, EventAction, } from './models/event.model';
import { ICalendarConfiguration, } from './models/calendar.model';


const colors: any = {
	red: {
		primary: '#ad2121',
		secondary: '#FAE3E3',
	},
	blue: {
		primary: '#1e90ff',
		secondary: '#D1E8FF',
	},
	yellow: {
		primary: '#e3bc08',
		secondary: '#FDF1BA',
	},
};
@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss', ],
	encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {

	view: string;

	viewDate: Date;

	activeDayIsOpen: boolean;
	selectedDay: any;
	events: CalendarEvent[] = [];

	calendarRefreshSubject: Subject<any>;

	refreshSubscription: Subscription;
	headerNextSubscription: Subscription;
	headerPrevioushSubscription: Subscription;
	headerTodaySubscription: Subscription;
	headerMonthYearSubscription: Subscription;

	constructor(public calendarService: CalendarService, public calendarHeaderService: CalendarHeaderService) {
		this.calendarRefreshSubject = new Subject<any>();

		this.viewDate = new Date();
		this.activeDayIsOpen = true;
		this.selectedDay = { date: startOfDay(new Date()), };
	}


	@Input()
	calendarConfiguration: ICalendarConfiguration;


	@Output()
	previousClick = new EventEmitter<{
		date: Date,
		view: string
	}>();


	@Output()
	nextClick = new EventEmitter<{
		date: Date,
		view: string
	}>();


	@Output()
	todayClick = new EventEmitter<{
		date: Date,
		view: string
	}>();

	@Output()
	monthYearPicker = new EventEmitter<{
		date: Date,
		view: string
	}>();

	/**
	 * Called when the day cell is clicked
	 */
	@Output()
	dayClicked = new EventEmitter<{
		date: Date,
		events: ICalendarDataModel[];
	}>();

	/**
	 * Called when the event title is clicked
	 */
	@Output()
	eventClicked = new EventEmitter<{
		event: ICalendarDataModel;
	}>();

	ngOnInit() {
		this.calendarConfiguration = this.calendarConfiguration || {} as ICalendarConfiguration;
		this.calendarConfiguration.ShowTitleBar = this.calendarConfiguration.ShowTitleBar || true;
		this.calendarConfiguration.Weekend = this.calendarConfiguration.Weekend || [];
		this.calendarConfiguration.EventTitleViewKey = this.calendarConfiguration.EventTitleViewKey || 'Title';
		this.view = this.calendarConfiguration.View || 'month';

		if (this.calendarService.refreshEvent) {
			this.refreshSubscription = this.calendarService.refreshEvent.subscribe(( payload: {action: EventAction, event: CalendarEventModel}) => {
				if (payload) {
					if (payload.action === EventAction.Add) {
						this.events.push(payload.event);
						this.logEvent(payload);
					} else if (payload.action === EventAction.Update) {
						this.events.map( ev => {
							if (ev.meta._id === payload.event.meta._id) {
								return new CalendarEventModel(payload.event);
							} else {
								return ev;
							}
						});
					} else if (payload.action === EventAction.Refresh) {
						this.setEvents();
					} else if (payload.action === EventAction.Get) {
						// this.calendarService.dataSender.next();
					}
					this.calendarService.updateEventList( { month: this.viewDate, events: this.events.map(_ => this.convertEventToModel(_)), } );
					this.calendarRefreshSubject.next();
				}
			});
		}

		if (this.calendarHeaderService.calendarNext) {
			this.headerNextSubscription = this.calendarHeaderService.calendarNext.subscribe(() => {
				this.nextClick.emit({ date: this.viewDate, view: this.view, });
			});
		}
		if (this.calendarHeaderService.calendarPrevious) {
			this.headerPrevioushSubscription = this.calendarHeaderService.calendarPrevious.subscribe(() => {
				this.previousClick.emit({ date: this.viewDate, view: this.view, });
			});
		}
		if (this.calendarHeaderService.calendarToday) {
			this.headerTodaySubscription = this.calendarHeaderService.calendarToday.subscribe(() => {
				this.todayClick.emit({ date: this.selectedDay.date, view: this.view, });
			});
		}
		if (this.calendarHeaderService.calendarMonthYear) {
			this.headerMonthYearSubscription = this.calendarHeaderService.calendarMonthYear.subscribe(() => {
				this.monthYearPicker.emit({ date: this.viewDate, view: this.view, });
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
		this.events = this.calendarConfiguration.Events.map((event: ICalendarDataModel) => {
			// event.cssClass = 'cal-event-background';
			return new CalendarEventModel({
				start: event.Date,
				title: event[this.calendarConfiguration.EventTitleViewKey],
				allDay: true,
				meta: {
					_id: event._id,
					notes: event.Comment,
					title: event.Title,
				},
			});
		});
		// this.calendarService.refreshEvent.next();
	}

	convertEventToModel(event: CalendarEvent): ICalendarDataModel {
		return <ICalendarDataModel> {
			// _id: event.meta._id,
			Title: event.meta.title,
			Comment: event.meta.notes,
			Date: event.start,
		};
	}

	onDayClicked(day: CalendarMonthViewDay): void {
		const date: Date = day.date;
		const events: CalendarEvent[] = day.events;

		if (isSameMonth(date, this.viewDate)) {
			if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
				this.activeDayIsOpen = false;
			} else {
				this.activeDayIsOpen = true;
				this.viewDate = date;
			}
		}
		this.selectedDay = day;
		this.calendarService.refresh();
		this.dayClicked.emit({ date: date, events: events.map( _ => this.convertEventToModel(_)), });
	}

	onEventClicked(action: string, event: CalendarEvent): void {
		this.eventClicked.emit({ event: this.convertEventToModel(event), });
		this.logEvent(event);
	}

	onViewChange(view: string) {
		this.view = view;
	}

	beforeMonthViewRender({ header, body, }) {
		const _selectedDay = body.find((_day) => {
			return _day.date.getTime() === this.selectedDay.date.getTime();
		});

		if (_selectedDay) {
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
		if (this.headerMonthYearSubscription) {
			this.headerMonthYearSubscription.unsubscribe();
		}
	}

}
