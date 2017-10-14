import {Component, OnInit} from '@angular/core';
import {ApplicationState} from '../commons/store/application-state';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import {Dashboard} from "../commons/models/data/dashboard";
import {ActivatedRoute} from "@angular/router";
import {DashboardsState} from "../commons/store/dashboards/dashboards-state";
import {CurrentDashboardChanged} from "../commons/store/dashboards/dashboards-actions";

@Component({
  selector: 'app-boards',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  currentDashboard$: Observable<Dashboard>;

  constructor(private store$: Store<ApplicationState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentDashboard$ = this.route.paramMap
      .switchMap(paramsMap => {
        const id:string = paramsMap.get('id');
        return this.store$
           .select('dashboards')
           .filter(dashboardsState => dashboardsState.dashboards != undefined)
           .map((state: DashboardsState) => {
             let selectedDb: Dashboard;
             state.dashboards.forEach((db: Dashboard, index) => {
               if (db.id === id) {
                 if (state.currentDashboard !== index) {
                   this.store$.dispatch(new CurrentDashboardChanged(index));
                 }
                 selectedDb = db;
               }
             })
             return selectedDb;
           });
      })
  }

}
