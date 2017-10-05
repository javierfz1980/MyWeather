import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Weather} from "../../commons/models/data/weather";
import {Dashboard} from '../../commons/models/data/dashboard';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../commons/store/application-state';
import {Subscription} from 'rxjs/Subscription';
import {DashboardsState} from '../../commons/store/dashboards/dashboards-state';
import {RemoveWeatherRequested} from '../../commons/store/dashboards/dashboards-actions';

@Component({
  selector: 'app-weathers',
  templateUrl: './weathers.component.html',
  styleUrls: ['./weathers.component.css']
})
export class WeathersComponent implements OnInit, OnDestroy {

  //@Input()
  private currentDashboard: Dashboard = new Dashboard();
  private subscription: Subscription;

  constructor(private store$: Store<ApplicationState>) { }

  ngOnInit() {
    this.subscription = this.store$
      .select('dashboards')
      .filter(dashboardsState => dashboardsState.dashboards != undefined)
      .subscribe((state: DashboardsState) => this.refreshInternalState(state))
  }

  private refreshInternalState(state: DashboardsState) {
    this.currentDashboard = state.dashboards[state.currentDashboard];
  }

  trackByWeatherId(index: number, weather: Weather): string {
    return weather.id;
  }

  removeWeatherById(weatherId: string) {
    this.store$.dispatch(new RemoveWeatherRequested(weatherId));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
