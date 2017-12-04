import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {ApplicationState} from "../../commons/store/application-state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {Dashboard} from "../../commons/models/data/dashboard";
import {DashboardsState} from "../../commons/store/dashboards/dashboards-state";
import {Router} from "@angular/router";
import {AppRoutes} from "../../commons/models/navigation/routing/app-routes";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {AddDashboardRequested} from "../../commons/store/dashboards/dashboards-actions";

@Component({
  selector: 'app-dashboards-panel',
  templateUrl: 'dashboards-panel.component.html',
  styleUrls: ['dashboards-panel.component.css']
})
export class DashboardsPanel implements OnInit {

  @Input()
  showLabelIcon: boolean = true;

  @ViewChild('dropDownMenu')
  dropDownMenu: ElementRef;

  state$: Observable<DashboardsState>;
  dashboards$: Observable<Dashboard[]>;
  currentDashboardName$: Observable<string>;
  isLoggedIn$: Observable<boolean>;
  isMobile$: Observable<boolean>;
  showMenu: boolean = false;
  dbForm: FormGroup;

  constructor(private store$: Store<ApplicationState>,
              private router: Router) {}

  ngOnInit() {
    this.isMobile$ = this.store$
      .select('device')
      .filter(deviceState => deviceState.isMobile !== undefined)
      .map(deviceState => {
         const isOpened: boolean = this.dropDownMenu && this.dropDownMenu.nativeElement.classList.contains('open');
         this.showMenu = (isOpened && deviceState.isMobile) ? deviceState.vScrollPosition === 0 : true;
         return deviceState.isMobile;
      });

    this.isLoggedIn$ = this.store$
      .select('signin')
      .filter(signinState => signinState.isLoggedIn !== undefined)
      .map(signinState => signinState.isLoggedIn);

    this.state$ = this.store$
      .select('dashboards')
      .filter((dbState: DashboardsState) => dbState.dashboards !== undefined);

    this.dashboards$ = this.state$
      .map((dbState: DashboardsState) => dbState.dashboards);

    this.currentDashboardName$ = this.state$
      .map((dbState: DashboardsState) => dbState.dashboards[dbState.currentDashboard].name);

    this.initNewDbForm();

  }

  onDbSelected(db: Dashboard) {
    this.router.navigate([AppRoutes.boards + db.id]);
  }

  createDb() {
    const newDb: Dashboard = this.dbForm.value;
    this.store$.dispatch(new AddDashboardRequested(newDb));
    //console.log('newDb: ', newDb);
  }

  private initNewDbForm() {
    this.dbForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

}
