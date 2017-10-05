import {Injectable} from "@angular/core";
import {ApplicationState} from '../store/application-state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class AuthService {

  private tokenKey: string = 'authorization';

  constructor(private store$: Store<ApplicationState>,
              private localStorageService: LocalStorageService){
    // console.log('is Auth', this.isAuthorized());
    // console.log('token', this.getToken())
  }

  isAuthorized$(): Observable<boolean>{
    return this.store$
      .select('signin')
      .map(signin => signin.isLoggedIn);
  }

  isAuthorized(): boolean {
    /*let isAuth: boolean = false;
     this.isAuthorized$()
     .take(1)
     .subscribe(res => isAuth = res)
     .unsubscribe();
     return isAuth;*/
    return this.getToken() !== null;
  }

  setToken(token: string, userEmail: string) {
    this.localStorageService.setItem(this.tokenKey, JSON.stringify({ token: token, user: userEmail}));
  }

  getToken(): string {
    const res: string = this.localStorageService.getItem(this.tokenKey);
    return (res) ? JSON.parse(res).token : null;
  }

  deleteToken() {
    this.localStorageService.removeItem(this.tokenKey);
  }

  getTokenUser(): any {
    const res: string = this.localStorageService.getItem(this.tokenKey);
    return (res) ? JSON.parse(res).user : null;
  }

}
