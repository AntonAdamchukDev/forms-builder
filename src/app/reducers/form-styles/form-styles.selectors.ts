import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ElementStyles } from "../element-styles/element-styles.reducer";
import { stylesFormNode } from "./form-styles.reducer";

const selectCheckedElementFeauture = createFeatureSelector<{styles:ElementStyles}>(stylesFormNode); 

export const selectFormStyles = createSelector(
    selectCheckedElementFeauture,
    (state:{styles:ElementStyles}):ElementStyles => state.styles
);