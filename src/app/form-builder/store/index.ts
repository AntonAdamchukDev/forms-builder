import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

import { environment } from 'src/environments/environment';
import {
  checkedElementStyleReducer,
  CheckedElementStyles,
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
  [stylesNode]: CheckedElementStyles;
  [stylesFormNode]: { styles: ElementStyles };
  [elementsNode]: Elements;
}

export const reducers: ActionReducerMap<State, any> = {
  [stylesNode]: checkedElementStyleReducer,
  [stylesFormNode]: formStyleReducer,
  [elementsNode]: elementsReducer,
};
