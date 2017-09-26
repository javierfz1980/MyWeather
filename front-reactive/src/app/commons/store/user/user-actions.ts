import {Action} from '@ngrx/store';
import {User} from '../../models/data/user';

export const UserActions = {
  GET_USER_INFO: 'Get User Info',
  CREATE_USER: 'User Created',
  DELETE_USER: 'User Deleted',
}

export class GetUserInfoAction implements Action {
  type = UserActions.GET_USER_INFO;
  constructor(public payload?: string) {}
}

export class CreateUserAction implements Action {
  type = UserActions.CREATE_USER;
  constructor(public payload?: User) {}
}

export class DeleteUserAction implements Action {
  type = UserActions.DELETE_USER;
  constructor(public payload?: User) {}
}
