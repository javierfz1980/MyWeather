import {Injectable} from "@angular/core";
import {ApplicationState} from '../store/application-state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/data/user';

@Injectable()
export class AuthService {

  constructor(private store$: Store<ApplicationState>){}

  isAuthorized$(): Observable<boolean>{
    return this.store$
      .select('signin')
      .map(signin => signin.isLoggedIn);
  }

  isAuthorized(): boolean {
    let isAuth: boolean = false;
    this.isAuthorized$()
      .take(1)
      .subscribe(res => isAuth = res)
      .unsubscribe();
    return isAuth;
  }

  getCurrentUser() {
    if(this.isAuthorized()) {
      let user: User;
      this.store$
        .select('user')
        .take(1)
        .map(state => state.user)
        .subscribe(currentUser => user = currentUser)
        .unsubscribe();
      return user;
    }
  }

}
