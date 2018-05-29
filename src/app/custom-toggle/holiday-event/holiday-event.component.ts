import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { ICalendarDataModel } from '../../shared/calendar/models/calendar-data.model';


@Component({
	selector: 'app-holiday-event',
	templateUrl: './holiday-event.component.html',
	styleUrls: ['./holiday-event.component.scss', ],
})
export class HolidayEventComponent implements OnInit {

	formData: ICalendarDataModel;
	eventForm: FormGroup;
	disableFields: boolean;

	eventTitles = [
		{value: 'holiday-0', viewValue: 'Weekend Holiday', },
		{value: 'holiday-1', viewValue: 'Annual Holiday', },
		{value: 'holiday-2', viewValue: 'Religious Holiday', },
	  ];

	constructor(private formBuilder: FormBuilder) {
		this.formData = {} as ICalendarDataModel;
	}

	ngOnInit() {
		this.eventForm = this.formBuilder.group({
			EventDate: [
				{
					value: this.formData.Date,
					disabled: this.disableFields,
				},
				[
					Validators.required,
				],
			],
			EventComment: [
				{
					value: this.formData.Comment,
					disabled: this.disableFields,
				},
				[
					Validators.required,
				],
			],
			EventTitle: [
				{
					value: this.formData.Title,
					disabled: this.disableFields,
				},
				[
					Validators.required,
				],
			],
		});
	}

	get value(): any {
		return this.eventForm.value;
	}

	get valid(): boolean {
		return this.eventForm.valid;
	}
}
