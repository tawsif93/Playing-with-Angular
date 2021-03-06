import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule, } from '@angular/flex-layout';

import { AppBoostrapModule } from './app-bootstrap/app-bootstrap.module';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { StudentModule } from './student/student.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CustomToggleModule } from './custom-toggle/custom-toggle.module';

const materials = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    // AppBoostrapModule,
    materials,
    StudentModule,
    AppRoutingModule,
    CustomToggleModule,
    SharedModule.forRoot()
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
