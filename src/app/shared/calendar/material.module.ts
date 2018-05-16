import {
	MatIconModule,
	MatButtonModule,
	MatToolbarModule,
	MatCardModule,
	MatTooltipModule,
	} from '@angular/material' ;
import { NgModule, } from '@angular/core';


  @NgModule({
	exports: [
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatCardModule,
		MatTooltipModule,
	],
  })
  export class MaterialModule {}
