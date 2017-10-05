import {Component, OnInit} from '@angular/core';
import {ApplicationState} from '../commons/store/application-state';
import {Store} from '@ngrx/store';
import {DashboardsState} from '../commons/store/dashboards/dashboards-state';
import {Observable} from "rxjs/Observable";
import {Dashboard} from "../commons/models/data/dashboard";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-boards',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  currentDashboard$: Observable<Dashboard>;
  dbId$: Observable<string>;

  constructor(private store$: Store<ApplicationState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .map(paramsMap => paramsMap.get('id'))
      .do(paramsMap => console.log('current dbId: ', paramsMap))
      .subscribe();

    this.route.url
        .map(() => this.route.snapshot.firstChild.params['id'])
        .do(id => console.log('current dbId: ', id))
        .subscribe()

    this.currentDashboard$ = this.store$
      .select('dashboards')
      .filter(dashboardsState => dashboardsState.dashboards != undefined)
      //.do(x => this.dbId$.subscribe())
      //.withLatestFrom(this.dbId$)
      .map((state: DashboardsState) => state.dashboards[state.currentDashboard])
  }

}
