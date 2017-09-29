import {Action} from '@ngrx/store';
import {DeviceActions, ResolutionChanged, ScrollChanged} from './device-actions';
export interface DeviceState {
  width: number,
  height: number,
  vScrollPosition: number,
  isMobile: boolean
}

export const INITIAL_DEVICE_STATE: DeviceState = {
  width: undefined,
  height: undefined,
  vScrollPosition: 0,
  isMobile: undefined
}

export function deviceStateReducer (state: DeviceState = INITIAL_DEVICE_STATE,
                                    action: Action): DeviceState {

  const newState: DeviceState = Object.assign({}, state);

  switch (action.type) {
    case DeviceActions.RESOLUTION_CHANGED: {
      const payload: {width: number, height: number, isMobile: boolean} = (<ResolutionChanged>action).payload;
      newState.height = payload.height;
      newState.width = payload.width;
      newState.isMobile = payload.isMobile;
      return newState;
    }
    case DeviceActions.SCROLL_CHANGED: {
      const payload: number = (<ScrollChanged>action).payload;
      newState.vScrollPosition = payload;
    }
    default: {
      return newState;
    }
  }
}
