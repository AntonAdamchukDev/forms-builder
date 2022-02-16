import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'forms-builder',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  { path: '', redirectTo: 'forms-builder', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./auth-form/auth-form.module').then((m) => m.AuthFormModule),
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
