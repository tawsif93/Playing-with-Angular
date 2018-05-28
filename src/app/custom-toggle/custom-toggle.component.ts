import { FilterPanelService } from './../shared/filter-panel/filter-panel.service';
import { FilterConfig, DropdownConfig, SearchBoxConfig, FilterType } from './../shared/filter-panel/model/filter.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ComponentLoaderService } from '../component-loader/services/component-loader.service';

@Component({
  selector: 'app-custom-toggle',
  templateUrl: './custom-toggle.component.html',
  styleUrls: ['./custom-toggle.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomToggleComponent implements OnInit {

  model: string;
  select: any ;

  conf = <FilterConfig<any>>{
    Title: 'Helo',
    Filters: [ <SearchBoxConfig>{
      Model: this.model,
      callback: _ => console.log(_),
      FilterType: FilterType.SEARCH_BOX,
      PlaceHolder: 'heeelll',
    },
    <DropdownConfig<any>> {
      ViewKey: 'view',
      PlaceHolder: 'Dropdown',
      FilterType: FilterType.DROP_DOWN,
      callback: _ => console.log(_),
      Model: this.select,
      Options: [ 
        {value : 'one', view: '1'},
        {value : 'three', view: '2'},
        {value : 'two', view: '3'},
        {value : 'four', view: '4'},
      ],
    }
  ],
  };

  constructor(public componentService: ComponentLoaderService, public filterService: FilterPanelService) { }

  ngOnInit() {
  }

  onToggle(message, on) {
    console.log(message, on);
    this.filterService.openPanel();
  }
}
