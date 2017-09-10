import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../commons/store/application-state';
import {UserState} from '../../commons/store/user/user-state';
import {User} from '../../commons/models/data/user';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit, OnDestroy {

  user: User;
  private subscription: Subscription;

  constructor(private store$: Store<ApplicationState>) { }

  ngOnInit() {
    this.subscription = this.store$
      .select('user')
      .skip(1)
      .do((state: UserState) => console.log("do: ",state)) // debug
      .subscribe((state: UserState) => this.refresInternalState(state));
  }

  refresInternalState(state: UserState) {
    this.user = state.user;
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  // destroy
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
