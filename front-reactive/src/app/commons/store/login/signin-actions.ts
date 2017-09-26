import {Action} from '@ngrx/store';
import {SessionCredentials} from '../../../login/models/sessionCredentials';
import {CustomResponse} from '../../models/http/CustomResponse';

export const SigninActions = {
  SIGNIN_REQUESTED: "Sigin Request",
  SIGNIN_FAILED: "Sigin Failed",
  SIGNIN_SUCCEEDED: "Sigin Succeed",
  SIGNIN_FORGOT_SWITCH: "Sigin / Forgot Switch",
  SIGNOUT_REQUESTED: 'Signout Requested',
  SIGNOUT_SUCCEEDED: 'Signout Succeed'
}

// login
export class SigninRequestedAction implements Action {
  readonly type = SigninActions.SIGNIN_REQUESTED;
  constructor(public payload?: SessionCredentials) {}
}

// login failed
export class SigninFailedtAction implements Action {
  readonly type = SigninActions.SIGNIN_FAILED;
  constructor(public payload?: CustomResponse) {}
}

// login seccess
export class SigninSucceededAction implements Action {
  readonly type = SigninActions.SIGNIN_SUCCEEDED;
  constructor(public payload?: string) {}
}

// login forgot switch
export class SigninForgotSwitchAction implements Action {
  readonly type = SigninActions.SIGNIN_FORGOT_SWITCH;
}

// signout
export class SignoutRequestedAction implements Action {
  readonly type = SigninActions.SIGNOUT_REQUESTED;
}

// signout succeeded
export class SignoutSucceededAction implements Action {
  readonly type = SigninActions.SIGNOUT_SUCCEEDED;
}

