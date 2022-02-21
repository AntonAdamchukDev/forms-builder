import { Action, createAction, props } from '@ngrx/store';
import { CheckedElement, ElementStyles } from './element-styles.reducer';

export enum changeActionTypes {
  setStyle = '[SET] styles',
  setElement = '[SET] element',
  setAll = '[SET] all',
}

export const setAllAction = createAction(
  changeActionTypes.setAll,
  props<CheckedElement>()
);

export const stylesSetAction = createAction(
  changeActionTypes.setStyle,
  props<{ styles: ElementStyles }>()
);

export const elementSetAction = createAction(
  changeActionTypes.setElement,
  props<{ element: string }>()
);
