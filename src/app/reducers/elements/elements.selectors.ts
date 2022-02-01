import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DragElement, Elements, elementsNode } from "./elements.reducer";

const selectCheckedElementFeauture = createFeatureSelector<Elements>(elementsNode); 

export const selectElements = createSelector(
    selectCheckedElementFeauture,
    (state:Elements):DragElement[] => state.elements
);