import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'forms-builder', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'forms-builder', pathMatch: 'full'},
  { path: 'page-not-found', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
