import { MaterialModule } from './../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormService } from './dynamic-form/dynamic-form.service';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormBuilderComponent } from './dynamic-form/dynamic-form-builder.component';
import { BrowserModule } from '@angular/platform-browser';


const modules: any[] = [ DynamicFormComponent];

@NgModule({
  imports: [
    CommonModule,  BrowserModule, ReactiveFormsModule , MaterialModule
  ],
  declarations: [modules, DynamicFormBuilderComponent],
  exports: [modules],
  providers: [DynamicFormService]
})
export class TuFormsModule { }
