import { Component, Input } from '@angular/core';

@Component({
  selector: 'labelled-button',
  template: `
  <div>
    {{toggleName}}:
    <toggle-button style="display: inline-block; vertical-align: middle"></toggle-button>
  </div>
  `,
})
export class LabelledButtonComponent {
  @Input()
  toggleName: string;
}
