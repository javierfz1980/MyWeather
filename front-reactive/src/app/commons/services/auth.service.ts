import {Injectable} from "@angular/core";
import {ApplicationState} from '../store/application-state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private tokenKey: string = 'currentUser';
  constructor(private store$: Store<ApplicationState>){
    console.log('is Auth', this.isAuthorized());
    console.log('token', this.getToken())
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

  saveToken(token: string, userEmail: string) {
    const email64: string = btoa(userEmail);
    localStorage.setItem(this.tokenKey, JSON.stringify({ token: token, user: email64}));
  }

  getToken(): any {
    return (localStorage.getItem(this.tokenKey)) ?
      JSON.parse(localStorage.getItem(this.tokenKey)).token : null;
  }

  deleteToken() {
    localStorage.removeItem(this.tokenKey);
  }

  getTokenUser(): any {
    return atob(JSON.parse(localStorage.getItem(this.tokenKey)).user);
  }

}
