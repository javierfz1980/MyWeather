import {Action} from '@ngrx/store';
import {Dashboard} from '../../models/data/dashboard';
export const PollingActions = {
  START_POLLING: "Start polling",
  STOP_POLLING: "Stop polling",
  POLLING_REQUEST: "Polling requested",
  POLLING_SUCCED: "Polling succed",
  POLLING_FAILED: "Polling failed"
}

export class StartPollingAction implements Action {
  type = PollingActions.START_POLLING;
}

export class StopPollingAction implements Action {
  type = PollingActions.STOP_POLLING;
}

export class PollingRequestAction implements Action {
  type = PollingActions.POLLING_REQUEST;
}

export class PollingSuccedAction implements Action {
  type = PollingActions.POLLING_SUCCED;
}

export class PollingFailedAction implements Action {
  type = PollingActions.POLLING_FAILED;
}
