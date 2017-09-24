import {Action} from '@ngrx/store';

export const DeviceActions = {
  RESOLUTION_CHANGED: 'Resolution has changed',
  SCROLL_CHANGED: 'Scroll Changed'
}

export class ResolutionChanged implements Action {
  type: string = DeviceActions.RESOLUTION_CHANGED;
  constructor(public payload?:{width: number, height: number, isMobile: boolean}){}
}

export class ScrollChanged implements Action {
  type: string = DeviceActions.SCROLL_CHANGED;
  constructor(public payload?: number){}
}
