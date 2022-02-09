import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthorizedUserComponent } from './authorized-user/authorized-user.component';
import { AuthFormComponent } from './auth-form/auth-form.component';

const routes: Routes = [
  { path: 'login', component: AuthFormComponent },
  { path: 'forms-builder', component: AuthorizedUserComponent, canActivate: [AuthGuard]},
  { path: 'registration', component: AuthFormComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
