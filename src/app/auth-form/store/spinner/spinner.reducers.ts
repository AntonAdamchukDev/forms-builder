import { createReducer, on } from '@ngrx/store';
import { SetVisibility } from './spinner.actions';

export const spinnerNode = 'spinner';

const initialState = {
  visibility: false,
};

export const spinnerReducer = createReducer(
  initialState,
  on(SetVisibility, (state, data) => ({
    ...state,
    visibility: data.visibility,
  }))
);
