import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-custom-toggle',
  templateUrl: './custom-toggle.component.html',
  styleUrls: ['./custom-toggle.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomToggleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onToggle(message, on) {
    console.log(message, on);
  }
}
