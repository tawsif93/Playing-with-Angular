import { Injectable, } from '@angular/core';
import { Subject, } from 'rxjs/Subject';
import { CalendarEventModel, EventAction, } from './models/event.model';
import { ICalendarDataModel, } from './models/calendar-data.model';
import { Observable, } from 'rxjs/Observable';
import { BehaviorSubject, } from 'rxjs/BehaviorSubject';

@Injectable()
export class CalendarService {

	refreshEvent: Subject<any> ;

	dataSender: BehaviorSubject<any>;

	dataSenderObservable: Observable<any>;

	constructor() {
		this.refreshEvent = new Subject<any>();
		this.dataSender = new BehaviorSubject([]);
		// this.dataSenderObservable = this.dataSender.asObservable();
	}

	/**
	 * addEvent
	 * @param CalendarEventModel
	 */
	public addEvent(event: ICalendarDataModel) {
		this.refreshEvent.next({ action: EventAction.Add , event : this.convertModelToEvent(event), });
	}

		/**
	 * addEvent
	 * @param CalendarEventModel
	 */
	public updateEvent(event: CalendarEventModel) {
		this.refreshEvent.next({ action: EventAction.Update , event : event, });
	}

	public refresh(): void {
		this.refreshEvent.next({action : EventAction.Refresh, });
	}

	/**
	 * updateEventList
	 */
	public updateEventList(events) {
		this.dataSender.next(events);
	}

	/**
	 * getEventList
	 */
	public getEventList() {
		// this.refreshEvent.next({ action: EventAction.Get , });
		return this.dataSender.getValue();
	}

	private convertModelToEvent(event: ICalendarDataModel): CalendarEventModel {
		return new CalendarEventModel({
			start: event.Date,
			title: event.Title,
			allDay: true,
			meta: {
				_id: event._id,
				notes: event.Comment,
				title: event.Title,
			},
		});
	}
}
