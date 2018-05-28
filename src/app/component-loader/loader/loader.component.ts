import { ComponentLoaderDirective, } from './../directives/component-loader.directive';
import { Component, OnInit, Input, } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() on: boolean;
  @Input() className: string;

  constructor() { }

  ngOnInit() {
  }

}
