import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterPanelModule } from './../shared/filter-panel/filter-panel.module';
import { ComponentLoaderModule } from './../component-loader/component-loader.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomToggleComponent } from './custom-toggle.component';
import { LabelledStateComponent } from './labelled-state.component';
import { LabelledButtonComponent } from './labelled-button.component';
import { ToggleModule } from './toggle/toggle.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderService } from './loader.service';
import { MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatSelectModule,
   MatIconModule, MatInputModule, MatDialogModule } from '@angular/material';
import { HolidayEventComponent } from './holiday-event/holiday-event.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ToggleModule,
    ComponentLoaderModule,
    MatButtonModule,
    FilterPanelModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    FlexLayoutModule,
    MatDialogModule,
   ],
  declarations: [
    CustomToggleComponent,
    LabelledButtonComponent,
    LabelledStateComponent,
    HolidayEventComponent,
  ],
  providers: [LoaderService],
  entryComponents: [HolidayEventComponent],
})
export class CustomToggleModule { }
