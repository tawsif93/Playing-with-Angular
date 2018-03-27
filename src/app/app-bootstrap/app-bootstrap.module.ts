import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AccordionModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule, AccordionModule ]
})
export class AppBoostrapModule {}
