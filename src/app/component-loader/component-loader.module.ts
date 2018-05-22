import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { ComponentLoaderDirective } from './directives/component-loader.directive';
import { ComponentLoaderService } from './services/component-loader.service';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  declarations: [LoaderComponent, ComponentLoaderDirective],
  providers: [ComponentLoaderService],
  exports: [ComponentLoaderDirective],
  entryComponents: [LoaderComponent]
})
export class ComponentLoaderModule { }
