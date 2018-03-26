import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppBoostrapModule } from './app-bootstrap/app-bootstrap.module';


import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { StudentModule } from './student/student.module';
import { AppRoutingModule } from './app-routing.module';

const materials = [ ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // AppBoostrapModule,
    materials,
    StudentModule,
    AppRoutingModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
