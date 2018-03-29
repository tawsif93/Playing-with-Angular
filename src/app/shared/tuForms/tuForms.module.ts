import { DynamicFormService } from './dynamic-form/dynamic-form.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


const modules: any[] = [ DynamicFormComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [modules],
  exports: [modules],
  providers: [DynamicFormService]
})
export class TuFormsModule { }
