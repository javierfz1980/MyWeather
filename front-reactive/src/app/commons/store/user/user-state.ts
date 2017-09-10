import {User} from '../../models/data/user';
import {Action} from '@ngrx/store'
import {UserActions} from './user-actions';

export interface UserState {
  user: User
}

export const INITIAL_USER_STATE: UserState = {
  user: undefined
}

export function userReducer(state: UserState = INITIAL_USER_STATE,
                            action: Action): UserState {

  //copiamos el estado actual para devolver una copia y no mutarlo
  const newState: UserState = Object.assign({}, state);

  switch (action.type) {
    case UserActions.CREATE_USER: {
      newState.user = action['payload'];
      return newState;
    }
    case UserActions.DELETE_USER: {
      newState.user = undefined;
      return newState;
    }
    default: {
      return state;
    }
  }

}
