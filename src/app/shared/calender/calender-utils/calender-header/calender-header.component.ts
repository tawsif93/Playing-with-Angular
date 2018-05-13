import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calender-header',
  templateUrl: './calender-header.component.html',
  styleUrls: ['./calender-header.component.css']
})
export class CalenderHeaderComponent implements OnInit {

  @Input() view: string;

  @Input() viewDate: Date;

  // tslint:disable-next-line:no-inferrable-types
  @Input() locale: string = 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
