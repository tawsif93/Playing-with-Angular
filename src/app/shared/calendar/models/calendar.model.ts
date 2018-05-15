import { ICalendarHeaderConfiguration } from './calendar-header.model';
import { CalendarEventModel } from './event.model';


export interface ICalendarConfiguration extends ICalendarHeaderConfiguration {
    View?: CalendarViews;
    DefaultEventBackgroundColor?: string;
    Events: CalendarEventModel[];
}

export enum CalendarViews {
    Month = 'month',
    Day = 'day',
    Week = 'week',
}
