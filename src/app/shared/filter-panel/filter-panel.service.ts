import { Injectable, } from '@angular/core';
import { Subject, } from 'rxjs/Subject';
import { Observable, } from 'rxjs/Observable';
import { BehaviorSubject, } from 'rxjs/BehaviorSubject';

@Injectable()
export class FilterPanelService {

	panelAction: Subject<boolean>;

	constructor() {
		this.panelAction = new Subject();
	}
	/**
	 * openPanel
	 */
	public openPanel() {
		this.panelAction.next(true);
	}
}
