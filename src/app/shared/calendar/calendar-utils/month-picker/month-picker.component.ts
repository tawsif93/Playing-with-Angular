import { Component, OnInit, Input, Inject, ViewChild, } from '@angular/core';
import { MatDatepickerInputEvent, } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker, } from '@angular/material';
import { MomentDateAdapter, } from '@angular/material-moment-adapter';

import * as _moment from 'moment';
import {  Moment, } from 'moment';
import { DOCUMENT, } from '@angular/common';
import { FormControl, } from '@angular/forms';
const moment =   _moment;

export const MONTH_MODE_FORMATS = {
	parse: {
	dateInput: 'MM/YYYY',
	},
	display: {
	dateInput: 'MM/YYYY',
	monthYearLabel: 'MMM YYYY',
	dateA11yLabel: 'LL',
	monthYearA11yLabel: 'MMMM YYYY',
	},
};

@Component({
	selector: 'app-month-picker',
	templateUrl: './month-picker.component.html',
	providers: [
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, ], },
		{ provide: MAT_DATE_FORMATS, useValue: MONTH_MODE_FORMATS, },
	],
})
export class MonthPickerComponent implements OnInit {


	ngOnInit() {
	}

	_max: Moment;
	@Input() get max(): string | Date {
		return this._max ? this._max.format('MM/YYYY') : undefined;
	}
	set max(max: string | Date) {
		// expect MM to be 1..12 and YYYY > 0
		if (max) {
			const momentDate = typeof max === 'string' ? moment(max, 'MM/YYYY') : moment(max);
			this._max = momentDate.isValid() ? momentDate : undefined;
		}
	}

	_min: Moment;
	@Input() get min(): string | Date {
		return this._min ? this._min.format('MM/YYYY') : undefined;
	}
	set min(min: string | Date) {
		// expect MM to be 1..12 and YYYY > 0
		if (min) {
			const momentDate = typeof min === 'string' ? moment(min, 'MM/YYYY') : moment(min);
			this._min = momentDate.isValid() ? momentDate : undefined;
		}
	}

	private _mode: 'SEMESTER' | 'MONTH' | 'MONTHYEAR';
	@Input() get mode(): 'SEMESTER' | 'MONTH' | 'MONTHYEAR' {
		return this._mode;
	}
	set mode(mode: 'SEMESTER' | 'MONTH' | 'MONTHYEAR') {
		this._mode = mode;
		setTimeout(() => this._setupFilter(), 300);
	}

	@Input() touchUi = false;

	_customFilter: (d: Moment) => boolean;

	@ViewChild(MatDatepicker) _picker: MatDatepicker<Moment>;

	_inputCtrl: FormControl = new FormControl();

	// Function to call when the date changes.
	onChange = (monthAndYear: Date) => { };

	// Function to call when the input is touched.
	onTouched = () => { };

	constructor( @Inject(DOCUMENT) private _document: any) { }

	writeValue(date: Date): void {
		if (date && this._isMonthEnabled(date.getFullYear(), date.getMonth())) {
			const momentDate = moment(date);
			if (momentDate.isValid()) {
				this._inputCtrl.setValue(momentDate, { emitEvent: false });
			}
		} else {
			setTimeout(() => {
				const momentDate = moment();
				if (this._mode === 'SEMESTER') {
					if (momentDate.month() > 5) {
						momentDate.set({
							month: 6,
							date: 1,
							hours: 12,
							minutes: 0,
							seconds: 0,
							milliseconds: 0,
						});
					} else {
						momentDate.set({
							month: 0,
							date: 1,
							hours: 12,
							minutes: 0,
							seconds: 0,
							milliseconds: 0,
						});
					}
					this._inputCtrl.setValue(momentDate, { emitEvent: false });
				}
			}, 300);
		}
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	// Allows Angular to disable the input.
	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this._picker.disabled = true : this._picker.disabled = false;

		isDisabled ? this._inputCtrl.disable() : this._inputCtrl.enable();
	}

	_yearSelectedHandler(chosenMonthDate: Moment, datepicker: MatDatepicker<Moment>) {
		if (!this._isYearEnabled(chosenMonthDate.year())) {
			datepicker.close();

			// wait for some time before enabling the calendar again
			setTimeout(() => datepicker.disabled = false, 600);
		}
	}

	_monthSelectedHandler(chosenMonthDate: Moment, datepicker: MatDatepicker<Moment>) {
		// as I'm using the focus event to open the calendar, this is necessary
		// so the calendar isn't opened again after a selection.
		datepicker.disabled = true;
		if (!this._isMonthEnabled(chosenMonthDate.year(), chosenMonthDate.month())) {
			datepicker.close();
			// wait for some time before enabling the calendar again
			setTimeout(() => {
				datepicker.disabled = false;
			});
			return;
		}

		if (this._max && chosenMonthDate.diff(this._max, 'month') > 0) {
			chosenMonthDate = this._max.clone();
		}

		if (this._min && this._min.diff(chosenMonthDate, 'month') > 0) {
			chosenMonthDate = this._min.clone();
		}

		this._inputCtrl.setValue(chosenMonthDate);
		this.onChange(chosenMonthDate.toDate());
		this.onTouched();
		datepicker.close();

		// wait for some time before enabling the calendar again
		setTimeout(() => {
			datepicker.disabled = false;
		}, 700);
	}

	_takeFocusAway(datepicker: MatDatepicker<Moment>) {
		const html = this._document.querySelector('.jp-custom-datepiker-element-to-focus') as HTMLInputElement;
		if (!!html && !!html['focus']) {
			html.focus();
		}

	}

	/** Whether the given year is enabled. */
	private _isYearEnabled(year: number) {
		// disable if the year is greater than maxDate lower than minDate
		if (year === undefined || year === null ||
			(this._max && year > this._max.year()) ||
			(this._min && year < this._min.year())) {
			return false;
		}

		// enable if it reaches here and there's no filter defined
		if (!this._customFilter) {
			return true;
		}

		const firstOfYear = moment([year, 0, 1]);

		// If any date in the year is enabled count the year as enabled.
		for (const date = firstOfYear; date.year() === year; date.add(1)) {
			if (this._customFilter(date)) {
				return true;
			}
		}

		return false;
	}

	/** Whether the given year is enabled. */
	private _isMonthEnabled(year: number, month: number) {
		if (month === undefined || month === null ||
			this._isYearAndMonthAfterMaxDate(year, month) ||
			this._isYearAndMonthBeforeMinDate(year, month)) {
			return false;
		}

		if (!this._customFilter) {
			return true;
		}

		const firstOfMonth = moment([year, month, 1]);

		// If any date in the month is enabled count the month as enabled.
		for (const date = firstOfMonth; date.month() === month; date.add(1, 'd')) {
			if (this._customFilter(date)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Tests whether the combination month/year is after this.maxDate, considering
	 * just the month and year of this.maxDate
	 */
	private _isYearAndMonthAfterMaxDate(year: number, month: number) {
		if (this._max) {
			const maxYear = this._max.year();
			const maxMonth = this._max.month();

			return year > maxYear || (year === maxYear && month > maxMonth);
		}

		return false;
	}

	/**
	 * Tests whether the combination month/year is before this.minDate, considering
	 * just the month and year of this.minDate
	 */
	private _isYearAndMonthBeforeMinDate(year: number, month: number) {
		if (this.min) {
			const minYear = this._min.year();
			const minMonth = this._min.month();

			return year < minYear || (year === minYear && month < minMonth);
		}

		return false;
	}

	_openDatepickerOnClick(datepicker: MatDatepicker<Moment>) {
		if (!datepicker.opened) {
			datepicker.open();
		}
	}

	_openDatepickerOnFocus(datepicker: MatDatepicker<Moment>) {
		setTimeout(() => {
			if (!datepicker.opened) {
				datepicker.open();
			}
		});
	}

	private _setupFilter() {
		switch (this.mode) {
			case 'SEMESTER':
				this._customFilter = (d: Moment) => {
					return d.month() === 0 || d.month() === 6;
				};
				break;
		}
	}

}
