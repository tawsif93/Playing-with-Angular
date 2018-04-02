import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { FormBase } from './form-base';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  @Input() fields: FormBase<any>[] = [];
  form: FormGroup;

  payLoad = '' ;

  constructor(private builderService: DynamicFormService) { }

  ngOnInit() {
    this.form = this.builderService.toFormGroup(this.fields);
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

}
