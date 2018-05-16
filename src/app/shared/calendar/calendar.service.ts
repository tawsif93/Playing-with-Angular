import { Injectable, } from '@angular/core';
import { Subject, } from 'rxjs';
import { CalendarEventModel, EventAction, } from './models/event.model';

@Injectable()
export class CalendarService {

	refreshEvent: Subject<any> ;

	constructor() {
		this.refreshEvent = new Subject<any>();
	}

	/**
	 * addEvent
	 * @param CalendarEventModel
	 */
	public addEvent(event: CalendarEventModel) {
		this.refreshEvent.next({ action: EventAction.Add , event : event, });
	}

		/**
	 * addEvent
	 * @param CalendarEventModel
	 */
	public updateEvent(event: CalendarEventModel) {
		this.refreshEvent.next({ action: EventAction.Update , event : event, });
	}

	public refresh(): void {
		this.refreshEvent.next();
	}
}
