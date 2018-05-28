import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentLoaderService } from '../component-loader/services/component-loader.service';

@Component({
  selector: 'app-custom-toggle',
  templateUrl: './custom-toggle.component.html',
  styleUrls: ['./custom-toggle.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomToggleComponent implements OnInit {

  constructor(public componentService: ComponentLoaderService) { }

  ngOnInit() {
  }

  onToggle(message, on) {
    console.log(message, on);
  }
}
