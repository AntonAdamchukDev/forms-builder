import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authNode } from '../constants/auth-form-nodes';
import { SignInformation } from '../interfaces/auth-interfaces';
import { registrationNode } from './auth-registration.reducer';

const selectRegistrationInfoFeature =
  createFeatureSelector<{ [registrationNode]: SignInformation }>(authNode);

export const selectRegistrationMessage = createSelector(
  selectRegistrationInfoFeature,
  (state: { [registrationNode]: SignInformation }): String =>
    state[registrationNode].message
);
