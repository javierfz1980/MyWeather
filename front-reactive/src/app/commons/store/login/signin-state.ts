import {Action} from '@ngrx/store';
import {SigninActions} from './signin-actions';

/**
 * Login State interface
 */
export interface SigninState {
  isBusy: boolean,
  isLoggedIn: boolean,
  wrongCredentials: boolean,
  isForgot: boolean
}

/**
 * Initial login state
 * @type {{isBusy: boolean; isLoggedIn: boolean}}
 */
export const INITIAL_SIGNIN_STATE: SigninState = {
  isBusy: false,
  isLoggedIn: false,
  wrongCredentials: false,
  isForgot: false
}


/**
 * Login Actions Reducer
 *
 * @param state
 * @param action
 * @returns {ApplicationState}
 * @constructor
 */
export function signinReducer(state: SigninState = INITIAL_SIGNIN_STATE,
                              action: Action): SigninState {

  //copiamos el estado actual para devolver una copia y no mutarlo
  const newState: SigninState = Object.assign({}, state);

  switch (action.type) {
    case SigninActions.SIGNIN_REQUESTED: {
      newState.isBusy = true;
      return newState;
    }
    case SigninActions.SIGNIN_FAILED: {
      newState.isBusy = false;
      newState.wrongCredentials = true;
      return newState;
    }
    case SigninActions.SIGNIN_SUCCEEDED: {
      newState.isBusy = false;
      newState.isLoggedIn = true;
      newState.wrongCredentials = false;
      return newState;
    }
    case SigninActions.SIGNIN_FORGOT_SWITCH: {
      newState.isForgot = !state.isForgot;
      return newState;
    }
    case SigninActions.SIGNOUT_REQUESTED: {
      newState.isBusy = true;
      return newState;
    }
    case SigninActions.SIGNOUT_SUCCEEDED: {
      newState.isBusy = false;
      newState.isLoggedIn = false;
      return newState;
    }
    default: {
      return state;
    }
  }
}
