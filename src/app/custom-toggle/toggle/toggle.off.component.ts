import { Component } from '@angular/core';

import { WithToggleDirective } from './toggle.withToggle.directive';

@Component({
  selector: 'toggle-off',
  template: `<ng-content *ngIf="!withToggle.toggle?.on"></ng-content>`,
})
export class ToggleOffComponent {
  constructor(public withToggle: WithToggleDirective) {}
}
