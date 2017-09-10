import {Action} from '@ngrx/store';
import {User} from '../../models/data/user';
import {CustomResponse} from '../../models/http/CustomResponse';

export const SignupActions = {
  SIGNUP_REQUEST: 'Signup requested',
  SIGNUP_FAILED: 'Signup failed',
  SIGNUP_SUCCED: 'Signup succeed',
  EDIT_USER_REUQEST: 'Edit user requested',
  EDIT_USER_FAILED: 'Edit user failed',
  EDIT_USER_SUCCED: 'Edit user succed'
}

export class SignupRequest implements Action {
  type = SignupActions.SIGNUP_REQUEST;
  constructor(public payload: User) {}
}

export class SignupFailed implements Action {
  type = SignupActions.SIGNUP_FAILED;
  constructor(public payload: CustomResponse) {}
}

export class SignupSucceed implements Action {
  type = SignupActions.SIGNUP_SUCCED;
  constructor(public payload: CustomResponse) {}
}

export class EditUserRequest implements Action {
  type = SignupActions.EDIT_USER_REUQEST;
  constructor(public payload: User) {}
}

export class EditUserFailed implements Action {
  type = SignupActions.EDIT_USER_FAILED;
  constructor(public payload: CustomResponse) {}
}

export class EditUserSucceed implements Action {
  type = SignupActions.EDIT_USER_SUCCED;
  constructor(public payload: CustomResponse) {}
}
