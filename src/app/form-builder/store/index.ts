import { ActionReducerMap } from '@ngrx/store';

import {
  checkedElementStyleReducer,
  CheckedElement,
  ElementStyles,
  stylesNode,
} from './element-styles/element-styles.reducer';
import {
  Elements,
  elementsNode,
  elementsReducer,
} from './elements/elements.reducer';
import {
  formStyleReducer,
  stylesFormNode,
} from './form-styles/form-styles.reducer';

export interface State {
  [stylesNode]: CheckedElement;
  [stylesFormNode]: { styles: ElementStyles };
  [elementsNode]: Elements;
}

export const reducers: ActionReducerMap<State, any> = {
  [stylesNode]: checkedElementStyleReducer,
  [stylesFormNode]: formStyleReducer,
  [elementsNode]: elementsReducer,
};
