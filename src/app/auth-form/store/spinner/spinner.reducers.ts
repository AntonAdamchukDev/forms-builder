import { createReducer, on } from '@ngrx/store';
import { SetIsLoading } from './spinner.actions';

export const spinnerNode = 'spinner';

const initialState = {
  isLoading: false,
};

export const spinnerReducer = createReducer(
  initialState,
  on(SetIsLoading, (state, data) => ({
    ...state,
    isLoading: data.isLoading,
  }))
);
