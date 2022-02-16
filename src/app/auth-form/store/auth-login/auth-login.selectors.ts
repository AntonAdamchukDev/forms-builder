import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authNode } from '../constants/auth-form-nodes';
import { SignInformation } from '../interfaces/auth-interfaces';
import { signInNode } from './auth-login.reducers';

const selectSignInInfoFeature =
  createFeatureSelector<{ [signInNode]: SignInformation }>(authNode);

export const selectSignInInfo = createSelector(
  selectSignInInfoFeature,
  (state: { [signInNode]: SignInformation }): SignInformation =>
    state[signInNode]
);
