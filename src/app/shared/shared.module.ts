import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth-guard.service';
import { CanDeactivateGuard } from './guards/can-deactivate-guard.service';
import { SharedService } from './shared.service';
import { TuFormsModule } from './tuForms/tuForms.module';

const SHARED_COMPONENTS = [
    TuFormsModule
];

@NgModule({
    imports: [CommonModule, RouterModule, ReactiveFormsModule, SHARED_COMPONENTS],
    declarations: [],
    exports: [
        SHARED_COMPONENTS,
        CommonModule,
    ],

    providers: []
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthGuard,
                CanDeactivateGuard,
                SharedService,
            ]
        };
    }
}
