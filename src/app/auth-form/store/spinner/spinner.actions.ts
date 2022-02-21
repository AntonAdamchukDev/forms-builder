import { createAction, props } from '@ngrx/store';

export enum SpinnerActionTypes {
  SET_IS_LOADING = '[Spinner] Set isLoading',
}

export const SetIsLoading = createAction(
  SpinnerActionTypes.SET_IS_LOADING,
  props<{ isLoading: boolean }>()
);
