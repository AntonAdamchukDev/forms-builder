import { createReducer, on } from '@ngrx/store';
import { initialStyle } from '../../constants/form-builder-constants';
import {
  elementSetAction,
  setAllAction,
  stylesSetAction,
} from './element-styles.actions';

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

export interface CheckedElement {
  styles: ElementStyles;
  element: string;
  key: string;
}

const initialState: CheckedElement = {
  styles: initialStyle,
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
  on(stylesSetAction, (state, data) => ({ ...state, styles: data.styles })),
  on(elementSetAction, (state, date) => ({ ...state, element: date.element }))
);
