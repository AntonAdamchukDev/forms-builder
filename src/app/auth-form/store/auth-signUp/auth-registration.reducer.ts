import { createReducer, on } from '@ngrx/store';
import {
  RegistrationFailure,
  RegistrationSuccess,
} from './auth-registration.action';

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
  on(RegistrationSuccess, (state, data) => ({
    ...state,
    authorized: true,
    message: new String(''),
  })),
  on(RegistrationFailure, (state, data) => ({
    ...state,
    authorized: false,
    message: new String(data.message),
  }))
);
