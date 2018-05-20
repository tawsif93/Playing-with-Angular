import { Component } from '@angular/core';

import { WithToggleDirective } from './toggle.withToggle.directive';

@Component({
  selector: 'toggle-button',
  template: '<switch [on]="withToggle.toggle?.on" (click)="onClick()" ></switch>',
})
export class ToggleButtonComponent  {
  constructor(public withToggle: WithToggleDirective) { }

  onClick() {
    this.withToggle.toggle.setOnState(!this.withToggle.toggle.on);
  }
}
