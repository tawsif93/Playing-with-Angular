import { ToggleOffComponent } from './toggle.off.component';
import { WithToggleDirective } from './toggle.withToggle.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToggleDirective } from './toggle.directive';

import { ToggleButtonComponent } from './toggle.button.component';
import { SwitchComponent } from '../irrelevant-implementation-details/switch.component';
import { ToggleOnComponent } from './toggle.on.component';

@NgModule({
  declarations: [
    WithToggleDirective,
    ToggleDirective,
    ToggleButtonComponent,
    ToggleOffComponent,
    ToggleOnComponent,
    SwitchComponent,
  ],
  imports: [ CommonModule ],
  exports: [
    WithToggleDirective,
    ToggleDirective,
    ToggleButtonComponent,
    ToggleOffComponent,
    ToggleOnComponent,
  ],
})
export class ToggleModule {}
