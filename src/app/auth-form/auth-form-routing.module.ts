import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from './auth-form.component';

const routes: Routes = [
  { path: 'login', component: AuthFormComponent },
  { path: 'registration', component: AuthFormComponent },
  { path: '**', redirectTo: '/page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthFormRoutingModule {}
