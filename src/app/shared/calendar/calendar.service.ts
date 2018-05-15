import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEventModel } from './models/event.model';

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
    this.refreshEvent.next(event);
  }

  public refresh(): void {
    this.refreshEvent.next();
  }
}
