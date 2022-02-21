import { ActionReducerMap } from '@ngrx/store';

import { signInNode, signInReducer } from './auth-login/auth-login.reducers';
import {
  registrationNode,
  registrationReducer,
} from './auth-signUp/auth-registration.reducer';
import { SignInformation } from './interfaces/auth-interfaces';
import { spinnerNode, spinnerReducer } from './spinner/spinner.reducers';

export interface State {
  [signInNode]: SignInformation;
  [registrationNode]: SignInformation;
  [spinnerNode]: { isLoading: boolean };
}

export const reducers: ActionReducerMap<State, any> = {
  [signInNode]: signInReducer,
  [registrationNode]: registrationReducer,
  [spinnerNode]: spinnerReducer,
};
