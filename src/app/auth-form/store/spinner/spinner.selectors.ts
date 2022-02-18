import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authNode } from '../constants/auth-form-nodes';
import { spinnerNode } from './spinner.reducers';

const selectSpinnerFeature =
  createFeatureSelector<{ [spinnerNode]: { visibility: boolean } }>(authNode);

export const selectSpinnerVisibility = createSelector(
  selectSpinnerFeature,
  (state: { [spinnerNode]: { visibility: boolean } }): boolean =>
    state[spinnerNode].visibility
);
