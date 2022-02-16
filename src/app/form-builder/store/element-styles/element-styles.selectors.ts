import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formsBuilderNode } from '../constants/forms-builder-nodes';
import {
  CheckedElementStyles,
  ElementStyles,
  stylesNode,
} from './element-styles.reducer';

const selectCheckedElementFeauture =
  createFeatureSelector<{ [stylesNode]: CheckedElementStyles }>(
    formsBuilderNode
  );

export const selectCheckedElement = createSelector(
  selectCheckedElementFeauture,
  (state: { [stylesNode]: CheckedElementStyles }): string =>
    state[stylesNode].key
);

export const selectStylesCheckedElement = createSelector(
  selectCheckedElementFeauture,
  (state: { [stylesNode]: CheckedElementStyles }): ElementStyles =>
    state[stylesNode].styles
);

export const selectElement = createSelector(
  selectCheckedElementFeauture,
  (state: { [stylesNode]: CheckedElementStyles }): string =>
    state[stylesNode].element
);
