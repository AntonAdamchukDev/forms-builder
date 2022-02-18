import { createReducer, on } from '@ngrx/store';
import { starterStyle } from '../../constants/form-builder-constants';
import { setAllAction, stylesSetAction } from './element-styles.actions';

export const stylesNode = 'styles';

export interface ElementStyles {
  height: string;
  width: string;
  'border-width': string;
  'border-color': string;
  'border-style': string;
  'border-radius': string;
  'font-size': string;
  'font-weight': string;
  color: string;
  placeholder: string;
  required: string;
}

export interface CheckedElementStyles {
  styles: ElementStyles;
  element: string;
  key: string;
}

const initialState: CheckedElementStyles = {
  styles: starterStyle,
  element: '',
  key: '',
};

export const checkedElementStyleReducer = createReducer(
  initialState,
  on(setAllAction, (state, data) => ({
    ...state,
    styles: data.styles,
    element: data.element,
    key: data.key,
  })),
  on(stylesSetAction, (state, data) => ({ ...state, styles: data.styles }))
);
