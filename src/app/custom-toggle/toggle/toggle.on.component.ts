import { Component } from '@angular/core';

import { WithToggleDirective } from './toggle.withToggle.directive';

@Component({
  selector: 'toggle-on',
  template: '<ng-content *ngIf="withToggle.toggle?.on"></ng-content>',
})
export class ToggleOnComponent {
  constructor(public withToggle: WithToggleDirective) { }
}
