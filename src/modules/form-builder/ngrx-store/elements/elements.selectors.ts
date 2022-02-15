import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formsBuilderNode } from '../constants/forms-builder-nodes';
import { DragElement, Elements, elementsNode } from './elements.reducer';

const selectCheckedElementFeauture =
  createFeatureSelector<{ [elementsNode]: Elements }>(formsBuilderNode);

export const selectElements = createSelector(
  selectCheckedElementFeauture,
  (state: { [elementsNode]: Elements }): DragElement[] =>
    state[elementsNode].elements
);
