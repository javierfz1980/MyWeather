import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../commons/store/application-state';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  isCollapsed = true;
  isMobile$: Observable<boolean>;

  constructor(private store$: Store<ApplicationState>) {
    this.isMobile$ = this.store$
      .select('device')
      .filter(deviceState => deviceState.isMobile !== undefined)
      .map(deviceState => deviceState.isMobile);
  }

}
