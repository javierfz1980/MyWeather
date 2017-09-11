import {Action} from '@ngrx/store';
import {PollingActions} from './polling-actions';
export interface PollingState {
  isLoading: boolean
}

export const INITIAL_POLLING_STATE: PollingState = {
  isLoading: false
}

export function pollingReducer(state: PollingState = INITIAL_POLLING_STATE,
                               action: Action): PollingState {

  const newState: PollingState = Object.assign({}, state);

  switch(action.type) {
    case PollingActions.POLLING_REQUEST: {
      newState.isLoading = true;
      return newState;
    }
    case PollingActions.POLLING_SUCCED: {
      newState.isLoading = false;
      return newState;

    }
    case PollingActions.POLLING_FAILED: {
      newState.isLoading = false;
      return newState;

    }
  }
}
