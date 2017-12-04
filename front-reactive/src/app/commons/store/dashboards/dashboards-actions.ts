import {Action} from '@ngrx/store';
import {Dashboard} from '../../models/data/dashboard';
import {Weather} from '../../models/data/weather';
import {User} from '../../models/data/user';
import {CustomResponse} from '../../models/http/CustomResponse';

export const DashboardActions = {
  LOAD_DASHBOARDS_REQUESTED: 'Dashboards Requested',
  LOAD_DASHBOARDS_FAILED: 'Dashboards Request Failed',
  LOAD_DASHBOARDS_SUCCEED: 'Dashboards Loaded',
  CURRENT_DASHBOARD_CHANGED: 'Current Dashboard Changed',
  REMOVE_WEATHER_REQUEST: 'Remove Weather Request',
  REMOVE_WEATHER_SUCCEED: 'Remove Weather Succeed',
  REMOVE_WEATHER_FAILED: 'Remove Weather Failed',
  ADD_WEATHER_REQUEST: 'Add Weather Request',
  ADD_WEATHER_SUCCEED: 'Add Weather Succeed',
  ADD_WEATHER_FAILED: 'Add Weather Failed',
  ADD_DASHBOARD_REQUEST: 'Add Dashboard Request',
  ADD_DASHBOARD_SUCCEED: 'Add Dashboard Succeed',
  ADD_DASHBOARD_FAILED: 'Add Dashboard Failed',
  REFRESH_DASHBOARDS: 'Refresh Dashboards'
}

export class LoadDashboardsRequested implements Action {
  type: string = DashboardActions.LOAD_DASHBOARDS_REQUESTED;
  constructor(public payload?: string){}
}

export class LoadDashboardsFailed implements Action {
  type: string = DashboardActions.LOAD_DASHBOARDS_FAILED;
  constructor(){}
}

export class LoadDashboardsSucceed implements Action {
  type: string = DashboardActions.LOAD_DASHBOARDS_SUCCEED;
  constructor(public payload?: Dashboard[]){}
}

export class CurrentDashboardChanged implements Action {
  type: string = DashboardActions.CURRENT_DASHBOARD_CHANGED;
  constructor(public payload?: number){}
}

export class RemoveWeatherRequested implements Action {
  type: string = DashboardActions.REMOVE_WEATHER_REQUEST;
  constructor(public payload?: string){}
}

export class RemoveWeatherSucceed implements Action {
  type: string = DashboardActions.REMOVE_WEATHER_SUCCEED;
  constructor(public payload?: CustomResponse){}
}

export class RemoveWeatherFailed implements Action {
  type: string = DashboardActions.REMOVE_WEATHER_FAILED;
  constructor(public payload?: CustomResponse){}
}

export class AddWeatherRequested implements Action {
  type: string = DashboardActions.ADD_WEATHER_REQUEST;
  constructor(public payload?: Weather){}
}

export class AddWeatherSucceed implements Action {
  type: string = DashboardActions.ADD_WEATHER_SUCCEED;
  constructor(public payload?: CustomResponse){}
}

export class AddWeatherFailed implements Action {
  type: string = DashboardActions.ADD_WEATHER_FAILED;
  constructor(public payload?: CustomResponse) {}
}

export class AddDashboardRequested implements Action {
  type: string = DashboardActions.ADD_DASHBOARD_REQUEST;
  constructor(public payload?: Dashboard){}
}

export class AddDashboardSucceed implements Action {
  type: string = DashboardActions.ADD_DASHBOARD_SUCCEED;
  constructor(public payload?: CustomResponse){}
}

export class AddDashboardFailed implements Action {
  type: string = DashboardActions.ADD_DASHBOARD_FAILED;
  constructor(public payload?: CustomResponse) {}
}

export class RefreshDashboards implements Action {
  type: string = DashboardActions.REFRESH_DASHBOARDS;
  constructor(public payload?: Dashboard[]){}
}
