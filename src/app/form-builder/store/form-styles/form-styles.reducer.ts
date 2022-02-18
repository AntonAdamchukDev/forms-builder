import { createReducer, on } from '@ngrx/store';
import { starterStyle } from '../../constants/form-builder-constants';
import { ElementStyles } from '../element-styles/element-styles.reducer';
import { stylesFormSetAction } from './form-styles.actions';

export const stylesFormNode = 'stylesForm';

const initialState: { styles: ElementStyles } = {
  styles: starterStyle,
};

export const formStyleReducer = createReducer(
  initialState,
  on(stylesFormSetAction, (state, data) => ({ ...state, styles: data.styles }))
);
