import { HolidayEventComponent } from './holiday-event/holiday-event.component';
import { FilterPanelService } from './../shared/filter-panel/filter-panel.service';
import { FilterConfig, DropdownConfig, SearchBoxConfig, FilterType, 
  DefaultSearchBoxConfig } from './../shared/filter-panel/model/filter.model';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { ComponentLoaderService } from '../component-loader/services/component-loader.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-custom-toggle',
  templateUrl: './custom-toggle.component.html',
  styleUrls: ['./custom-toggle.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomToggleComponent implements OnInit {

  model: string;
  select: any ;
  defaultModel: string;

  conf = <FilterConfig<any>>{
    Title: 'Helo',
    Default: <DefaultSearchBoxConfig> {
      Model: this.defaultModel,
      callback: _ => console.log(_),
      FilterType: FilterType.SEARCH_BOX,
      PlaceHolder: 'Default',
      Width: '200px',
    },
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

  constructor(public componentService: ComponentLoaderService, public filterService: FilterPanelService, public dialog: MatDialog) { }

  openDialog(event): void {
    let dialogRef = this.dialog.open(HolidayEventComponent, {
      width: '400px',
      data: { view: 'edit'  }
    });
    const rect = new ElementRef(event.currentTarget).nativeElement.getBoundingClientRect();

    dialogRef.updatePosition({ left: `${rect.left}px`, top: `${rect.bottom + 50}px` });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  ngOnInit() {
  }

  onToggle(message, on) {
    console.log(message, on);
    this.filterService.openPanel();
  }
}
