import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formsBuilderNode } from '../constants/forms-builder-nodes';
import {
  CheckedElement,
  ElementStyles,
  stylesNode,
} from './element-styles.reducer';

const selectCheckedElementFeauture =
  createFeatureSelector<{ [stylesNode]: CheckedElement }>(formsBuilderNode);

export const selectCheckedElement = createSelector(
  selectCheckedElementFeauture,
  (state: { [stylesNode]: CheckedElement }): string => state[stylesNode].key
);

export const selectStylesCheckedElement = createSelector(
  selectCheckedElementFeauture,
  (state: { [stylesNode]: CheckedElement }): ElementStyles =>
    state[stylesNode].styles
);

export const selectElement = createSelector(
  selectCheckedElementFeauture,
  (state: { [stylesNode]: CheckedElement }): string => state[stylesNode].element
);
