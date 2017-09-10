import {Injectable} from "@angular/core";
import {ApplicationState} from '../store/application-state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

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

}
