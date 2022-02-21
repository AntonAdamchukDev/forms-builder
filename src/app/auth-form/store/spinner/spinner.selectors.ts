import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authNode } from '../constants/auth-form-nodes';
import { spinnerNode } from './spinner.reducers';

const selectIsLoadingFeature =
  createFeatureSelector<{ [spinnerNode]: { isLoading: boolean } }>(authNode);

export const selectIsLoading = createSelector(
  selectIsLoadingFeature,
  (state: { [spinnerNode]: { isLoading: boolean } }): boolean =>
    state[spinnerNode].isLoading
);
