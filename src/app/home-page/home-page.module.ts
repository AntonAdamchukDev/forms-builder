import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderModule } from '../../app/form-builder/form-builder.module';
import { HomePageComponent } from './home-page.component';
import { HomePagesRoutingModule } from './home-page-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePagesRoutingModule,
    FormBuilderModule,
    SharedModule,
  ],
  exports: [HomePageComponent],
})
export class HomePageModule {}
