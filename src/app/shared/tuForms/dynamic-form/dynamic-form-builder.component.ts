import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBase } from './form-base';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
})
export class DynamicFormBuilderComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() formField: FormBase<any>;

  isValid(): boolean {
    return this.form.controls[this.formField.key].valid ;
  }

  constructor() { }

  ngOnInit() {
  }

}
