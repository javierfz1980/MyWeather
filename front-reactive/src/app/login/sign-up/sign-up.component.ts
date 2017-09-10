import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../commons/models/data/user";
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../commons/services/auth.service";
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../commons/store/application-state';
import {SignupState} from '../../commons/store/signup/signup-state';
import {EditUserRequest, SignupRequest} from '../../commons/store/signup/signup-actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  internalState: SignupState = {
    isLoading: false,
    responseStatus: undefined,
    accountCreated: false,
    errorCreatingAccount: false,
    accountEdited: false,
    errorMessage: undefined,
    formVisible: true,
    titleVisible: true
  }
  private signUpForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private store$: Store<ApplicationState>,
              private authService: AuthService) {

    const user: User = this.authService.isAuthorized() ? this.getCurrentUser() : new User();
    this.signUpForm = new FormGroup({
      'name': new FormControl(user.name, Validators.required),
      'lastname': new FormControl(user.lastname, Validators.required),
      'email': new FormControl(user.email, [Validators.required, Validators.email]),
      'password': new FormControl(user.password, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required),
      'age': new FormControl(user.age, Validators.required),
      'gender': new FormControl(user.gender, Validators.required),
      'defaultDashboardName': new FormControl(user.defaultDashboardName, Validators.required)
    });

    this.subscriptions.push(
      this.store$
        .select('signup')
        .skip(1)
        .subscribe(state => this.internalState = state)
    )
  }

  ngOnInit() {}

  private getCurrentUser(): User {
    let user: User;
    this.store$
      .select('user')
      .take(1)
      .map(userState => userState.user)
      .subscribe(currentUser => user = currentUser)
      .unsubscribe();
    return user;
  }

  onSubmit() {
    const user: User = this.signUpForm.value;
    if (this.authService.isAuthorized()) {
      this.store$.dispatch(new EditUserRequest(user));
    } else {
      this.store$.dispatch(new SignupRequest(user))
    }
  }


  isAuthorized(): boolean {
    return this.authService.isAuthorized();
  }

  ages(): number[] {
    return Array.from(Array(100),(x,i)=>i);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
