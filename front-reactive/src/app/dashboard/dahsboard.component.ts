import {Component, OnInit} from '@angular/core';
import {ApplicationState} from '../commons/store/application-state';
import {Store} from '@ngrx/store';
import {DashboardsState} from '../commons/store/dashboards/dashboards-state';
import {Observable} from "rxjs/Observable";
import {Dashboard} from "../commons/models/data/dashboard";

@Component({
  selector: 'app-boards',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  currentDashboard$: Observable<Dashboard>;

  constructor(private store$: Store<ApplicationState>) { }

  ngOnInit() {
    this.currentDashboard$ = this.store$
      .select('dashboards')
      .filter(dashboardsState => dashboardsState.dashboards != undefined)
      .map((state: DashboardsState) => state.dashboards[state.currentDashboard])
  }

}
