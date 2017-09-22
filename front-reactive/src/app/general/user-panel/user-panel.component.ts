import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../commons/store/application-state';
import {UserState} from '../../commons/store/user/user-state';
import {User} from '../../commons/models/data/user';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../commons/services/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit, OnDestroy {

  @Input()
  showLabelIcon: boolean = true;

  showDropDown: boolean = true;
  isLoggedIn: boolean = false;
  user: User;
  private subscription: Subscription;

  constructor(private store$: Store<ApplicationState>,
              private authService: AuthService) { }

  ngOnInit() {
    this.autoHideDropDownOnMobiles();
    this.checkInitialState();
    this.subscription = this.store$
      .select('user')
      .skip(1)
      .do((state: UserState) => console.log("do: ",state)) // debug
      .subscribe((state: UserState) => this.refreshInternalState(state));
  }

  refreshInternalState(state: UserState) {
    this.user = state.user;
    this.isLoggedIn = state.user !== undefined;
  }

  checkInitialState() {
    this.isLoggedIn = this.authService.isAuthorized();
    if(this.isLoggedIn) this.user = this.authService.getCurrentUser();
  }

  // TODO: Improve/change this behavior.
  @HostListener('window:scroll', ['$event'])
  autoHideDropDownOnMobiles(event?) {
    this.showDropDown = (window.pageYOffset === 0 && window.screen.width < 768) ||
      (window.screen.width >= 768);
  }

  // destroy
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
