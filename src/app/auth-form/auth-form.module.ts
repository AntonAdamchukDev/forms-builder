import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthFormRoutingModule } from './auth-form-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AuthFormComponent } from './auth-form.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { environment } from '../../environments/environment';
import { reducers } from './store';
import { AuthEffectsLogin } from './store/auth-login/auth-login.effects';
import { authNode } from './store/constants/auth-form-nodes';
import { AuthEffectsRegistration } from './store/auth-signUp/auth-registration.effects';

@NgModule({
  declarations: [AuthFormComponent, CustomInputComponent],
  imports: [
    AuthFormRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forFeature([AuthEffectsLogin, AuthEffectsRegistration]),
    StoreModule.forFeature(authNode, reducers, {}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [AuthFormComponent],
})
export class AuthFormModule {}
