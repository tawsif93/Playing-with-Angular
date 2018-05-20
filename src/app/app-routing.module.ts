import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CustomToggleComponent } from './custom-toggle/custom-toggle.component';

const routes: Routes = [
  { path: '', redirectTo: '/student-list', pathMatch: 'full' },
  {
    path: 'student-list',
    component: StudentListComponent,
    canActivate: [AuthGuard],
    canDeactivate: [CanDeactivateGuard]
  },
  { path: 'detail/:id', component: StudentDetailComponent },
  { path: 'toggle', component: CustomToggleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true})],
  exports: [RouterModule],
  // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule {}
