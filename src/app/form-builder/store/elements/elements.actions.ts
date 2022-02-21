import { Action, createAction, props } from '@ngrx/store';
import { DragElement } from './elements.reducer';

export enum changeActionTypes {
  setElements = '[Elements] set',
  clearElements = '[Elements] clear',
}

export const setElementsAction = createAction(
  changeActionTypes.setElements,
  props<{ elements: DragElement[] }>()
);

export const clearElementsAction = createAction(
  changeActionTypes.clearElements
);
