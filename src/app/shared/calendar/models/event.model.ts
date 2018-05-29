import {
	CalendarEventAction,
} from 'angular-calendar';

import {
	startOfDay,
	endOfDay,
	subDays,
	addDays,
	endOfMonth,
	isSameDay,
	isSameMonth,
	addHours,
} from 'date-fns';
// import { CalendarEvent } from 'calendar-utils/dist/calendar-utils';

/*
export interface EventAction
{
	label: string;
	cssClass?: string;

	onClick({event}: {
		event: CalendarEvent;
	}): any;
}*/

export class CalendarEventModel {
	start: Date;
	end?: Date;
	title: string;
	color: {
		primary: string;
		secondary: string;
	};
	actions?: CalendarEventAction[];
	allDay?: boolean;
	cssClass?: string;
	resizable?: {
		beforeStart?: boolean;
		afterEnd?: boolean;
	};
	draggable?: boolean;
	meta?: {
		_id?: string,
		location: string,
		notes: string,
		title: string,
	};

	constructor(data?) {
		data = data || {};
		this.start = new Date(data.start) || startOfDay(new Date());
		this.end = new Date(data.end) || endOfDay(new Date());
		this.title = data.title || '';
		this.color = {
			primary  : data.color && data.color.primary || '#1e90ff',
			secondary: data.color && data.color.secondary || '#D1E8FF',
		};
		this.draggable = data.draggable || true;
		this.resizable = {
			beforeStart: data.resizable && data.resizable.beforeStart || true,
			afterEnd   : data.resizable && data.resizable.afterEnd || true,
		};
		this.actions = data.actions || [];
		this.allDay = data.allDay || false;
		this.cssClass = data.cssClass || '';
		this.meta = {
			_id: data.meta && data.meta._id || '',
			location: data.meta && data.meta.location || '',
			notes   : data.meta && data.meta.notes || '',
			title   : data.meta && data.meta.title || '',
		};
	}

}


export enum EventAction {
	Refresh = 'refresh',
	Update = 'update',
	Add = 'add',
	Delete = 'delete',
	Get = 'get',
}
