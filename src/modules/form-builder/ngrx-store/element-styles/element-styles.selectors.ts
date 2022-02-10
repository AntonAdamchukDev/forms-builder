import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CheckedElementStyles, ElementStyles, stylesNode } from "./element-styles.reducer";

const selectCheckedElementFeauture = createFeatureSelector<CheckedElementStyles>(stylesNode); 

export const selectCheckedElement = createSelector(
    selectCheckedElementFeauture,
    (state:CheckedElementStyles):string => state.key
);

export const selectStylesCheckedElement = createSelector(
    selectCheckedElementFeauture,
    (state:CheckedElementStyles):ElementStyles => state.styles
);

export const selectElement = createSelector(
    selectCheckedElementFeauture,
    (state:CheckedElementStyles):string => state.element
);