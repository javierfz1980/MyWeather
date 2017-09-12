import {ActionReducer, StoreModule} from '@ngrx/store';
import {signinReducer, SigninState} from './login/signin-state';
import {ModuleWithProviders} from '@angular/core';
import {userReducer, UserState} from './user/user-state';
import {dashboardsReducer, DashboardsState} from './dashboards/dashboards-state';
import {SignupState, signupReducer} from './signup/signup-state';
import {pollingReducer, PollingState} from './polling/polling-state';
import {searchReducer, SearchState} from './search/search-state';

/*
export interface ApplicationState {
  loginState: SigninState
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  loginState: INITIAL_SIGNIN_STATE
}
*/
/*
export function ApplicationReducer (state: ApplicationState = INITIAL_APPLICATION_STATE,
                                    action: Action): ApplicationState {

  console.log("app reducer: ", action.type);
  console.log("payload: ", action['payload']);

  switch (action.type) {
    default:
      return state;
  }
}
*/

export interface ApplicationState {
  signin: SigninState,
  user: UserState,
  dashboards: DashboardsState,
  signup: SignupState,
  pollingState: PollingState,
  search: SearchState
}

export const ApplicationStatesReducers: {[key: string]: ActionReducer<any>} = {
  signin: signinReducer,
  user: userReducer,
  dashboards: dashboardsReducer,
  signup: signupReducer,
  polling: pollingReducer,
  search: searchReducer
};

export const applicationStateImports: ModuleWithProviders[] = [StoreModule.forRoot(ApplicationStatesReducers)];
