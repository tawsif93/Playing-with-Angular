import { ICalendarHeaderConfiguration, } from './../../models/calendar-header.model';
import { CalendarHeaderService, } from './../calendar-header.service';
import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation, } from '@angular/core';

@Component({
	selector: 'app-calendar-header',
	templateUrl: './calendar-header.component.html',
	styleUrls: ['./calendar-header.component.scss', ],
	encapsulation: ViewEncapsulation.None,
	providers: [],
})
export class CalendarHeaderComponent implements OnInit {

	@Input() view: string;

	@Input() viewDate: Date;

	@Input() locale = 'en';

	@Input() configuration: ICalendarHeaderConfiguration;

	@Output() viewChange: EventEmitter<string> = new EventEmitter();

	@Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

	constructor(public headerService: CalendarHeaderService) {
		this.configuration = this.configuration || { } as ICalendarHeaderConfiguration;
	}

	ngOnInit() {
	}

}
