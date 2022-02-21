import { Action, createAction, props } from '@ngrx/store';
import { User } from '../auth-login/auth-login.actions';

export enum AuthActionTypes {
  SIGN_UP = '[Auth] Sign Up',
  SIGN_UP_SUCCESS = '[Auth] Sign Up Success',
  SIGN_UP_FAILURE = '[Auth] Sign Up Failure',
}

export const signUp = createAction(AuthActionTypes.SIGN_UP, props<User>());

export const signUpSuccess = createAction(AuthActionTypes.SIGN_UP_SUCCESS);

export const signUpFailure = createAction(
  AuthActionTypes.SIGN_UP_FAILURE,
  props<{ message: string }>()
);
