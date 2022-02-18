import { Action, createAction, props } from '@ngrx/store';
import { User } from '../auth-login/auth-login.actions';

export enum AuthActionTypes {
  REGISTRATION = '[Auth] Registration',
  REGISTRATION_SUCCESS = '[Auth] Registration Success',
  REGISTRATION_FAILURE = '[Auth] Registration Failure',
}

export const Registration = createAction(
  AuthActionTypes.REGISTRATION,
  props<User>()
);

export const RegistrationSuccess = createAction(
  AuthActionTypes.REGISTRATION_SUCCESS
);

export const RegistrationFailure = createAction(
  AuthActionTypes.REGISTRATION_FAILURE,
  props<{ message: string }>()
);
