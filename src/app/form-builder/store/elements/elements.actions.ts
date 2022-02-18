import { Action, createAction, props } from '@ngrx/store';
import { DragElement } from './elements.reducer';

export enum changeActionTypes {
  setElements = '[Elements] set',
}

export const setElementsAction = createAction(
  changeActionTypes.setElements,
  props<{ elements: DragElement[] }>()
);
