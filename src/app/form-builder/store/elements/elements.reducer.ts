import { createReducer, on } from '@ngrx/store';
import { setElementsAction } from './elements.actions';

export const elementsNode = 'elementsForm';

export interface DragElement {
  element: string;
  key: number;
}

export interface Elements {
  elements: DragElement[];
}

export const initialState: Elements = {
  elements: [{ element: '', key: -1 }],
};

export const elementsReducer = createReducer(
  initialState,
  on(setElementsAction, (state, data) => ({
    ...state,
    elements: data.elements,
  }))
);
