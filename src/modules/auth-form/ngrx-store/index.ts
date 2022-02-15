import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { signInNode, signInReducer } from './auth-login/auth-login.reducers';
import {
  registrationNode,
  registrationReducer,
} from './auth-register/auth-registration.reducer';
import { SignInformation } from './interfaces/auth-interfaces';

export interface State {
  [signInNode]: SignInformation;
  [registrationNode]: SignInformation;
}

export const reducers: ActionReducerMap<State, any> = {
  [signInNode]: signInReducer,
  [registrationNode]: registrationReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
