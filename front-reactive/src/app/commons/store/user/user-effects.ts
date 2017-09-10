import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {SigninActions, SigninSucceededAction} from '../login/signin-actions';
import {CreateUserAction, DeleteUserAction, UserActions} from './user-actions';
import {User} from '../../models/data/user';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions) {}

 /* @Effect()
  private createUserAction$: Observable<Action> = this.actions$
    .ofType(UserActions.CREATE_USER)
    .switchMap((action: CreateUserAction) => {
      const user:User = action.payload;
      return Observable.of(new CreateUserAction(user));
    })

  @Effect()
  private deleteUserAction$: Observable<Action> = this.actions$
    .ofType(UserActions.DELETE_USER)
    .switchMap(() => {
      return Observable.of(new DeleteUserAction());
    })*/

}
