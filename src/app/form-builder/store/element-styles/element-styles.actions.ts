import { Action, createAction, props } from '@ngrx/store';
import { CheckedElementStyles, ElementStyles } from './element-styles.reducer';

export enum changeActionTypes {
  setStyle = '[SET] styles',
  setKey = '[SET] key',
  setElement = '[SET] element',
  setAll = '[SET] all',
}

export const setAllAction = createAction(
  changeActionTypes.setAll,
  props<CheckedElementStyles>()
);

export const stylesSetAction = createAction(
  changeActionTypes.setStyle,
  props<{ styles: ElementStyles }>()
);
