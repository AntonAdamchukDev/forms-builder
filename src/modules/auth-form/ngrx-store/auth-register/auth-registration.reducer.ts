import {
  AuthActionTypes,
  RegistrationsActions,
} from './auth-registration.action';

export const registrationNode = 'registration';

export interface RegistrationUser {
  authorized: boolean;
  message: string;
}

const initialState: RegistrationUser = {
  authorized: false,
  message: '',
};

export const registrationReducer = (
  state = initialState,
  action: RegistrationsActions
) => {
  switch (action.type) {
    case AuthActionTypes.REGISTRATION_SUCCESS: {
      return {
        ...state,
        authorized: true,
        message: '',
      };
    }
    case AuthActionTypes.REGISTRATION_FAILURE: {
      return {
        ...state,
        authorized: false,
        message: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
};
