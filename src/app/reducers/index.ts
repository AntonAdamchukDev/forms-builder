import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { checkedElementStyleReducer, CheckedElementStyles, ElementStyles, stylesNode } from './element-styles/element-styles.reducer';
import { formStyleReducer, stylesFormNode } from './form-styles/form-styles.reducer';


export interface State {
  [stylesNode] : CheckedElementStyles,
  [stylesFormNode] : {styles:ElementStyles}
}

export const reducers: ActionReducerMap<State,any> = {
  [stylesNode]:checkedElementStyleReducer,
  [stylesFormNode]:formStyleReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
