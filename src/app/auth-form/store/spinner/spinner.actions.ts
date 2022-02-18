import { createAction, props } from '@ngrx/store';

export enum SpinnerActionTypes {
  SET_VISIBILITY = '[Spinner] Set visibility',
}

export const SetVisibility = createAction(
  SpinnerActionTypes.SET_VISIBILITY,
  props<{ visibility: boolean }>()
);
