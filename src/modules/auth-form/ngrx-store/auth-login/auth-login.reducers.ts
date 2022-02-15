import { SignInformation } from '../interfaces/auth-interfaces';
import { AuthActionTypes, signInActions } from './auth-login.actions';

export const signInNode = 'signIn';

const initialState: SignInformation = {
  authorized: false,
  message: '',
};

export const signInReducer = (state = initialState, action: signInActions) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        authorized: true,
        message: '',
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
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
