import {Action} from '@ngrx/store';
import {User} from '../../models/data/user';

export const UserActions = {
  CREATE_USER: 'User Created',
  DELETE_USER: 'User Deleted',
}

export class CreateUserAction implements Action {
  type = UserActions.CREATE_USER;
  constructor(public payload?: User) {}
}

export class DeleteUserAction implements Action {
  type = UserActions.DELETE_USER;
  constructor(public payload?: User) {}
}
