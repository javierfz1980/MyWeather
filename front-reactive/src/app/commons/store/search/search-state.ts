import {Weather} from '../../models/data/weather';
import {Action} from '@ngrx/store';
import {SearchActions, SearchSucceed} from './search-actions';

export interface SearchState {
  results: Weather[],
  showResults: boolean,
  isLoading: boolean
}

export const INITIAL_SEARCH_STATE: SearchState = {
  results: undefined,
  showResults: false,
  isLoading: false
}

export function searchReducer (state: SearchState = INITIAL_SEARCH_STATE,
                               action: Action): SearchState {

  const newState: SearchState = Object.assign({}, state);

  switch (action.type) {
    case SearchActions.SEARCH_REQUEST: {
      newState.isLoading = true;
      newState.showResults = false;
      return newState;
    }
    case SearchActions.SEARCH_SUCCED: {
      newState.isLoading = false;
      newState.showResults = true;
      newState.results = (<SearchSucceed>action).payload;
      return newState;
    }
    case SearchActions.SEARCH_FAIL: {
      newState.isLoading = false;
      newState.showResults = false;
      return newState;
    }
  }

}
