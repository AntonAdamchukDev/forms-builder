import { createAction, props } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SET_MESSAGE = '[Auth] Set Message',
}

export interface User {
  email: string;
  password: string;
}

export const LogIn = createAction(AuthActionTypes.LOGIN, props<User>());

export const LogInSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ idToken: string; expiresIn: number }>()
);

export const LogInFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ message: string }>()
);

export const SetMessage = createAction(
  AuthActionTypes.SET_MESSAGE,
  props<{ message: string }>()
);
