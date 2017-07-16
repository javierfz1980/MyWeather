import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/models/data/user";
import {HttpService} from "../../shared/services/http.service";
import {Subscription} from "rxjs/Subscription";
import {CustomResponse} from "../../shared/models/http/CustomResponse";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  private ages:Number[];
  private signUpForm: FormGroup;
  private loadingStatus: boolean = false;
  private titleVisible: boolean = true;
  private responseStatus: string;
  private formVisible: boolean = true;
  private accountCreated: boolean;
  private errorCreatingAccount: boolean;
  private accountEdited: boolean;
  private errorMessage: string = '';

  // subscriptions
  private signUpSubscription: Subscription;

  constructor(private httpService: HttpService, private authService: AuthService) {

    const user = (this.isAuthorized()) ? this.authService.user : new User();

    this.ages = Array.from(Array(100),(x,i)=>i);
    this.signUpForm = new FormGroup({
      'name': new FormControl(user.name, Validators.required),
      'lastname': new FormControl(user.lastname, Validators.required),
      'email': new FormControl(user.email, [Validators.required, Validators.email]),
      'password': new FormControl(user.password, Validators.required),
      'confirmPassword': new FormControl(null, Validators.required),
      'age': new FormControl(user.age, Validators.required),
      'gender': new FormControl(user.gender, Validators.required),
      'dashboard': new FormControl(user.dashboard, Validators.required)
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.loadingStatus = true;
    //(this.authService.isAuthorized()) ? this.edit() : this.signUp();
    this.signUp();
    this.refresh();
  }

  private edit(): void {
    console.log('TODO edit user');
  }

  private signUp(): void {
    const newUser: User = this.signUpForm.value;
    this.signUpSubscription = this.httpService.requestApi(HttpService.USER_PATH, HttpService.PUT, newUser)
      .subscribe(
        (response: CustomResponse) => {
          this.loadingStatus = false;
          this.responseStatus = response.status;
          this.refresh();
        },
        (error: CustomResponse) => {
          this.loadingStatus = false;
          this.responseStatus = error.status;
          this.errorMessage = error.message;
          this.refresh();
        }
    );
  }



  private refresh(): void {
    this.titleVisible = (!this.responseStatus || this.responseStatus == HttpService.STATUS_SERVER_ERROR);
    this.accountCreated = !this.isAuthorized() && !this.loadingStatus && this.responseStatus == HttpService.STATUS_CREATED;
    this.errorCreatingAccount = !this.loadingStatus && this.responseStatus == HttpService.STATUS_SERVER_ERROR;
    this.formVisible = !this.loadingStatus && (!this.responseStatus || this.responseStatus == HttpService.STATUS_SERVER_ERROR);
    this.accountEdited = this.isAuthorized() && !this.loadingStatus && this.responseStatus == HttpService.STATUS_CREATED;;
  }

  isAuthorized(): boolean {
    return this.authService.isAuthorized();
  }
  ngOnDestroy() {
    if(this.signUpSubscription)this.signUpSubscription.unsubscribe();
  }
}
