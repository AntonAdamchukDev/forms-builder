import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthFormComponent } from './auth-form.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { AuthFormRoutingModule } from './auth-form-routing.module';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [AuthFormComponent, CustomInputComponent],
  imports: [
    AuthFormRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [AuthFormComponent],
})
export class AuthFormModule {}
