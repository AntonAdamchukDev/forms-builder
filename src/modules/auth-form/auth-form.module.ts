import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthFormRoutingModule } from './auth-form-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AuthFormComponent } from './auth-form.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { environment } from 'src/environments/environment';
import { reducers, metaReducers } from './ngrx-store';
import { AuthEffectsLogin } from './ngrx-store/auth-login/auth-login.effects';
import { authNode } from './ngrx-store/constants/auth-form-nodes';
import { AuthEffectsRegistration } from './ngrx-store/auth-register/auth-registration.effects';

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
    StoreModule.forFeature(authNode, reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  exports: [AuthFormComponent],
})
export class AuthFormModule {}
