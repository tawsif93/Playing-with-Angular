import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student/student-list/student-list.component';
import { StudentDetailComponent } from './student/student-detail/student-detail.component';
import { AuthGuard } from './shared/guards/auth-guard.service';



const routes: Routes = [
  { path: '', redirectTo: '/student-list', pathMatch: 'full' },
  { path: 'student-list', component:  StudentListComponent , canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
  { path: 'detail/:id', component: StudentDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
