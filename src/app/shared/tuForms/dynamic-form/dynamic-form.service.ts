import { Injectable } from '@angular/core';
import { FormBase } from './form-base';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable()
export class DynamicFormService {

  constructor() { }

  toFormGroup(questions: FormBase<any>[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }
}
