import { Injectable, } from '@angular/core';
import { Subject, } from 'rxjs/Subject';

@Injectable()
export class CalendarHeaderService {

	calendarNext: Subject<boolean>;
	calendarPrevious: Subject<boolean>;
	calendarToday: Subject<boolean>;
	calendarMonthYear: Subject<boolean>;

	constructor() {
		this.calendarNext = new Subject<boolean>();
		this.calendarPrevious = new Subject<boolean>();
		this.calendarToday = new Subject<boolean>();
		this.calendarMonthYear = new Subject<boolean>();
	}

}
