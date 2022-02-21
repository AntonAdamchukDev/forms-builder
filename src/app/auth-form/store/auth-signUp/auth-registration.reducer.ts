import { createReducer, on } from '@ngrx/store';
import { signUpFailure, signUpSuccess } from './auth-registration.action';

export const registrationNode = 'registration';

export interface RegistrationUser {
  authorized: boolean;
  message: String;
}

const initialState: RegistrationUser = {
  authorized: false,
  message: '',
};

export const registrationReducer = createReducer(
  initialState,
  on(signUpSuccess, (state, data) => ({
    ...state,
    authorized: true,
    message: '',
  })),
  on(signUpFailure, (state, data) => ({
    ...state,
    authorized: false,
    message: new String(data.message),
  }))
);
