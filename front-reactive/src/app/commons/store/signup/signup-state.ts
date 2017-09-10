import {Action} from '@ngrx/store';
import {SignupActions, SignupSucceed} from './signup-actions';

export interface SignupState {
  isLoading: boolean,
  responseStatus: string,
  accountCreated: boolean,
  errorCreatingAccount: boolean,
  accountEdited: boolean,
  errorMessage: string,
  formVisible: boolean,
  titleVisible: boolean;
}

export const INITIAL_SIGNUP_STATE: SignupState = {
  isLoading: false,
  responseStatus: undefined,
  accountCreated: false,
  errorCreatingAccount: false,
  accountEdited: false,
  errorMessage: undefined,
  formVisible: true,
  titleVisible: true
}

export function signupReducer (state: SignupState = INITIAL_SIGNUP_STATE,
                                    action: Action): SignupState {

  const newState: SignupState = Object.assign({}, state);
  switch (action.type) {
    case SignupActions.SIGNUP_REQUEST: {
      newState.isLoading = true;
      newState.formVisible = false;
      return newState;
    }
    case SignupActions.SIGNUP_SUCCED: {
      newState.isLoading = false;
      newState.responseStatus = (<SignupSucceed>action).payload.status;
      newState.accountCreated = true;
      newState.titleVisible = false;
      return newState;
    }
    case SignupActions.SIGNUP_FAILED: {
      newState.isLoading = false;
      newState.responseStatus = (<SignupSucceed>action).payload.status;
      newState.errorCreatingAccount = true;
      newState.errorMessage = (<SignupSucceed>action).payload.data;
      newState.formVisible = true;
      return newState;
    }
    case SignupActions.EDIT_USER_REUQEST: {
      newState.isLoading = true;
      newState.formVisible = false;
      return newState;
    }
    case SignupActions.EDIT_USER_FAILED: {
      newState.isLoading = false;
      newState.responseStatus = (<SignupSucceed>action).payload.status;
      newState.errorMessage = 'Error updating user';
      newState.formVisible = true;
      newState.errorCreatingAccount = true;
      return newState;
    }
    case SignupActions.EDIT_USER_SUCCED: {
      newState.isLoading = false;
      newState.accountEdited = true;
      newState.responseStatus = (<SignupSucceed>action).payload.status;
      newState.titleVisible = false;
      return newState;
    }
  }
}
