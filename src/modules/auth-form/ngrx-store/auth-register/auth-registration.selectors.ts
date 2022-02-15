import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authNode } from '../constants/auth-form-nodes';
import { SignInformation } from '../interfaces/auth-interfaces';
import { registrationNode } from './auth-registration.reducer';

const selectRegistrationInfoFeature =
  createFeatureSelector<{ [registrationNode]: SignInformation }>(authNode);

export const selectRegistrationInfo = createSelector(
  selectRegistrationInfoFeature,
  (state: { [registrationNode]: SignInformation }): SignInformation =>
    state[registrationNode]
);
