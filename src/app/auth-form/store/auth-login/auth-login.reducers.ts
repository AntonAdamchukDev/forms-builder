import { createReducer, on } from '@ngrx/store';
import { SignInformation } from '../interfaces/auth-interfaces';
import { LogInFailure, LogInSuccess, SetMessage } from './auth-login.actions';

export const signInNode = 'signIn';

const initialState: SignInformation = {
  authorized: false,
  message: '',
};

export const signInReducer = createReducer(
  initialState,
  on(LogInSuccess, (state, data) => ({
    ...state,
    authorized: false,
    message: '',
  })),
  on(LogInFailure, (state, data) => ({
    ...state,
    authorized: false,
    message: data.message,
  })),
  on(SetMessage, (state, data) => ({
    ...state,
    message: data.message,
  }))
);
