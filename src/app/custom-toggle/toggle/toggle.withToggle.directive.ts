import { Directive, Input, Optional, Host, OnChanges, SimpleChanges } from '@angular/core';

import { ToggleDirective } from './toggle.directive';

@Directive({
  exportAs: 'withToggle',
  selector: 'toggle, [toggle], [withToggle]',
})
export class WithToggleDirective implements OnChanges {
  @Input()
  withToggle: ToggleDirective;

  toggle: ToggleDirective = this.toggleDirective;

  constructor(
    @Host() @Optional() private toggleDirective: ToggleDirective,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const { withToggle } = changes;
    if (withToggle) {
      this.toggle = this.withToggle || this.toggleDirective;
    }
  }
}
