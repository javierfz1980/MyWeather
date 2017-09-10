import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApplicationState} from '../commons/store/application-state';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import {DashboardsState} from '../commons/store/dashboards/dashboards-state';

@Component({
  selector: 'app-boards',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  private title: string;
  private loadedState: string = 'loadedState';
  private subscription: Subscription;

  constructor(private store$: Store<ApplicationState>) { }

  ngOnInit() {
    this.subscription = this.store$
      .select('dashboards')
      //.skip(1)
      .filter(dashboardsState => dashboardsState.dashboards != undefined)
      .subscribe((state: DashboardsState) => this.refreshInternalState(state));
  }

  private refreshInternalState(state: DashboardsState) {
    this.title = state.dashboards[state.currentDashboard].name;
  }

  getCurrentTitle(): string{
    return this.title;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
