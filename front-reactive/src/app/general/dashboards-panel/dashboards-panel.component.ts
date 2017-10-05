import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {ApplicationState} from "../../commons/store/application-state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

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

  isLoggedIn$: Observable<boolean>;
  isMobile$: Observable<boolean>;
  showMenu: boolean = false;

  constructor(private store$: Store<ApplicationState>) {}

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
  }

}
