import { MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDividerModule, } from '@angular/material';
import { FlexLayoutModule, } from '@angular/flex-layout';
import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FilterPanelComponent, } from './filter-panel.component';
import { FilterPanelService, } from './filter-panel.service';
import { FormsModule, } from '@angular/forms';
// import { DirectiveModule, } from './../../modules/directive.module';
import { DebounceDirective } from './directives/debounceDirective';

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
		MatDividerModule,
		// DirectiveModule,
		// DebounceDirective,
	],
	declarations: [ FilterPanelComponent , DebounceDirective],
	exports: [ FilterPanelComponent, ],
	providers: [ FilterPanelService, ],
})
export class FilterPanelModule { }
