import { Action } from '@ngrx/store';
import { User } from '../auth-login/auth-login.actions';

export enum AuthActionTypes {
  REGISTRATION = '[Auth] Registration',
  REGISTRATION_SUCCESS = '[Auth] Registration Success',
  REGISTRATION_FAILURE = '[Auth] Registration Failure',
}

export class Registration implements Action {
  readonly type = AuthActionTypes.REGISTRATION;
  constructor(public payload: User) {}
}

export class RegistrationSuccess implements Action {
  readonly type = AuthActionTypes.REGISTRATION_SUCCESS;
}

export class RegistrationFailure implements Action {
  readonly type = AuthActionTypes.REGISTRATION_FAILURE;
  constructor(public payload: { message: string }) {}
}

export type RegistrationsActions =
  | Registration
  | RegistrationSuccess
  | RegistrationFailure;
