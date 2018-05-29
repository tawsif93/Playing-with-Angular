import { ICalendarHeaderConfiguration, } from './calendar-header.model';
import { ICalendarDataModel, } from './calendar-data.model';


export interface ICalendarConfiguration extends ICalendarHeaderConfiguration, ICalendarConfigurationEvent {
	View?: CalendarViews;
	DefaultEventBackgroundColor?: string;
	Events: ICalendarDataModel[];
	Weekend?: number[];
}

export enum CalendarViews {
	Month = 'month',
	Day = 'day',
	Week = 'week',
}

export interface ICalendarConfigurationEvent {
	EventTitleViewKey?: string;
}
