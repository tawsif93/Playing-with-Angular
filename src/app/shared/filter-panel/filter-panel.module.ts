import { MatIconModule, MatButtonModule, } from '@angular/material';
import { FlexLayoutModule, } from '@angular/flex-layout';
import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FilterPanelComponent, } from './filter-panel.component';
import { FilterPanelService, } from './filter-panel.service';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		MatIconModule,
		MatButtonModule,
	],
	declarations: [ FilterPanelComponent , ],
	exports: [ FilterPanelComponent, ],
	providers: [ FilterPanelService, ],
})
export class FilterPanelModule { }
