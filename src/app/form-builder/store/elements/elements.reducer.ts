import { createReducer, on } from '@ngrx/store';
import { clearElementsAction, setElementsAction } from './elements.actions';

export const elementsNode = 'elementsForm';

export interface DragElement {
  element: string;
  key: string;
}

export interface Elements {
  elements: DragElement[];
}

const initialState: Elements = {
  elements: [{ element: '', key: '-1' }],
};

export const elementsReducer = createReducer(
  initialState,
  on(setElementsAction, (state, data) => ({
    ...state,
    elements: data.elements,
  })),
  on(clearElementsAction, (state, data) => ({
    ...state,
    elements: initialState.elements,
  }))
);
