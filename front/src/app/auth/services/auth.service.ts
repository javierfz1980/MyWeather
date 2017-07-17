import {Injectable} from "@angular/core";
import {User} from "../../shared/models/data/user";
import {HttpService} from "../../shared/services/http.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../shared/models/navigation/routing/app-routes";

@Injectable()
export class AuthService {

  private _user: User;

  constructor(private httpService: HttpService, private router: Router){}

  isAuthorized(): boolean{
    return this._user != null;
  }

  get user(): User{
    return this._user
  }

  forgot(): void {

  }

  refresh(user: User): void {
    this._user = user;
  }

  signIn(user: User): void {
    this._user = user;
    this.router.navigate([AppRoutes.boards]);
  }

  signOut(): void {
    this._user = null;
    this.router.navigate(['']);
  }


}
