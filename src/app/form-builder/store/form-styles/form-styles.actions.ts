import { Action, createAction, props } from '@ngrx/store';
import { ElementStyles } from '../element-styles/element-styles.reducer';

export enum changeFormActionTypes {
  setFormStyle = '[SET] form styles',
}

export const stylesFormSetAction = createAction(
  changeFormActionTypes.setFormStyle,
  props<{
    styles: ElementStyles;
  }>()
);
