import {ActionReducer, StoreModule} from '@ngrx/store';
import {INITIAL_SIGNIN_STATE, signinReducer, SigninState} from './login/signin-state';
import {ModuleWithProviders} from '@angular/core';
import {INITIAL_USER_STATE, userReducer, UserState} from './user/user-state';
import {
  dashboardsReducer, DashboardsState,
  INITIAL_DASHBOARDS_STATE
} from './dashboards/dashboards-state';
import {SignupState, signupReducer, INITIAL_SIGNUP_STATE} from './signup/signup-state';
import {INITIAL_POLLING_STATE, pollingReducer, PollingState} from './polling/polling-state';
import {INITIAL_SEARCH_STATE, searchReducer, SearchState} from './search/search-state';
import {DeviceState, deviceStateReducer, INITIAL_DEVICE_STATE} from './device/device-state';

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

  // console.log("app reducer: ", action.type);
  // console.log("payload: ", action['payload']);

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
  search: SearchState,
  device: DeviceState
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  signin: INITIAL_SIGNIN_STATE,
  user: INITIAL_USER_STATE,
  dashboards: INITIAL_DASHBOARDS_STATE,
  signup: INITIAL_SIGNUP_STATE,
  pollingState: INITIAL_POLLING_STATE,
  search: INITIAL_SEARCH_STATE,
  device: INITIAL_DEVICE_STATE
}

export const ApplicationStatesReducers: {[key: string]: ActionReducer<any>} = {
  signin: signinReducer,
  user: userReducer,
  dashboards: dashboardsReducer,
  signup: signupReducer,
  polling: pollingReducer,
  search: searchReducer,
  device: deviceStateReducer
};

export const applicationStateImports: ModuleWithProviders[] = [StoreModule.forRoot(ApplicationStatesReducers)];
