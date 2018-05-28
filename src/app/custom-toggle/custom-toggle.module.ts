import { ComponentLoaderModule } from './../component-loader/component-loader.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomToggleComponent } from './custom-toggle.component';
import { LabelledStateComponent } from './labelled-state.component';
import { LabelledButtonComponent } from './labelled-button.component';
import { ToggleModule } from './toggle/toggle.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderService } from './loader.service';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [ BrowserModule, FormsModule, ToggleModule, ComponentLoaderModule, MatButtonModule ],
  declarations: [CustomToggleComponent, LabelledButtonComponent, LabelledStateComponent],
  providers: [LoaderService],
})
export class CustomToggleModule { }
