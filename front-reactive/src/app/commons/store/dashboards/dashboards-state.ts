import {Dashboard} from '../../models/data/dashboard';
import {Action} from '@ngrx/store';
import {
  AddWeatherSucceed, DashboardActions, RefreshDashboards,
  RemoveWeatherSucceed
} from './dashboards-actions';
import {Weather} from '../../models/data/weather';

export interface DashboardsState {
  dashboards: Dashboard[],
  currentDashboard: number,
  isLoading: boolean
}

export const INITIAL_DASHBOARDS_STATE: DashboardsState = {
  dashboards: undefined,
  currentDashboard: 0,
  isLoading: false
}

export function dashboardsReducer (state: DashboardsState = INITIAL_DASHBOARDS_STATE,
                                   action: Action): DashboardsState {
  const newState: DashboardsState = Object.assign({}, state);

  switch (action.type) {
    case DashboardActions.LOAD_DASHBOARDS_REQUESTED: {
      newState.isLoading = true;
      return newState;
    }
    case DashboardActions.LOAD_DASHBOARDS_SUCCEED: {
      newState.isLoading = false;
      newState.dashboards = action['payload'];
      newState.currentDashboard = 0;
      return newState;
    }
    case DashboardActions.LOAD_DASHBOARDS_FAILED: {
      newState.isLoading = false;
      newState.dashboards = undefined;
      return newState;
    }
    case DashboardActions.CURRENT_DASHBOARD_CHANGED: {
      newState.currentDashboard = action['payload'];
    }
    case DashboardActions.REMOVE_WEATHER_REQUEST: {
      newState.isLoading = true;
      return newState;
    }
    case DashboardActions.REMOVE_WEATHER_FAILED: {
      newState.isLoading = false;
      console.log('REMOVE_WEATHER_FAILED: ', action.type, action, state);
      return newState;
    }
    case DashboardActions.REMOVE_WEATHER_SUCCEED: {
      newState.isLoading = false;
      const dashboards: Dashboard[] = newState.dashboards.map(dashboard => Object.assign({},dashboard));
      const weathers: Weather[] = newState.dashboards[newState.currentDashboard].weathers
        .filter(weather => weather.id !== (<RemoveWeatherSucceed>action).payload.data.id );
      dashboards[newState.currentDashboard].weathers = weathers;
      newState.dashboards = dashboards;
      return newState;
    }
    case DashboardActions.ADD_WEATHER_REQUEST: {
      newState.isLoading = true;
      return newState;
    }
    case DashboardActions.ADD_WEATHER_FAILED: {
      newState.isLoading = false;
      console.log('ADD_WEATHER_FAILED: ', action.type, action, state);
      return newState;
    }
    case DashboardActions.ADD_WEATHER_SUCCEED: {
      newState.isLoading = false;
      const dashboards: Dashboard[] = newState.dashboards.map(dashboard => Object.assign({},dashboard));
      const weathers: Weather[] = newState.dashboards[newState.currentDashboard].weathers.map(weather => Object.assign({},weather));
      weathers.push((<AddWeatherSucceed>action).payload.data);
      dashboards[newState.currentDashboard].weathers = weathers;
      newState.dashboards = dashboards;
      //newState.dashboards[newState.currentDashboard].weathers.push((<AddWeatherSucceed>action).payload.data)
      return newState;
    }
    case DashboardActions.REFRESH_DASHBOARDS: {
      console.log("dashboards refreshed", (<RefreshDashboards>action).payload);
      newState.dashboards = (<RefreshDashboards>action).payload;
      return newState;
    }
    default: {
      return state;
    }
  }
}
