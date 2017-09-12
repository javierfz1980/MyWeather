import {Action} from '@ngrx/store';
import {Weather} from '../../models/data/weather';
import {CustomResponse} from '../../models/http/CustomResponse';

export const SearchActions = {
  SEARCH_REQUEST: "Search Request,",
  SEARCH_SUCCED: "Search Succeed",
  SEARCH_FAIL: "Search Failed"
}

export class SearchRequest implements Action {
  type = SearchActions.SEARCH_REQUEST
  constructor(public payload?: string){}
}

export class SearchSucceed implements Action {
  type = SearchActions.SEARCH_SUCCED
  constructor(public payload?: Weather[]) {}
}

export class SearchFail implements Action {
  type = SearchActions.SEARCH_FAIL
  constructor(public payload?: CustomResponse){}
}
