import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formsBuilderNode } from '../constants/forms-builder-nodes';
import { ElementStyles } from '../element-styles/element-styles.reducer';
import { stylesFormNode } from './form-styles.reducer';

const selectCheckedElementFeauture =
  createFeatureSelector<{ [stylesFormNode]: { styles: ElementStyles } }>(
    formsBuilderNode
  );

export const selectFormStyles = createSelector(
  selectCheckedElementFeauture,
  (state: { [stylesFormNode]: { styles: ElementStyles } }): ElementStyles =>
    state[stylesFormNode].styles
);
