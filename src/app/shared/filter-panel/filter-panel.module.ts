import { DebounceDirective } from './directives/debounceDirective';
import { MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, } from '@angular/material';
import { FlexLayoutModule, } from '@angular/flex-layout';
import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FilterPanelComponent, } from './filter-panel.component';
import { FilterPanelService, } from './filter-panel.service';
import { FormsModule, } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FlexLayoutModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
	],
	declarations: [ FilterPanelComponent , DebounceDirective, ],
	exports: [ FilterPanelComponent, ],
	providers: [ FilterPanelService, ],
})
export class FilterPanelModule { }
