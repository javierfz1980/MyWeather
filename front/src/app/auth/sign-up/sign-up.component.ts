import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/models/data/user";
import {HttpService} from "../../shared/services/http.service";
import {Subscription} from "rxjs/Subscription";
import {CustomResponse} from "../../shared/models/http/CustomResponse";
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs/Observable";

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
  private subscription: Subscription;

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
      'defaultDashboardName': new FormControl(user.defaultDashboardName, Validators.required)
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.loadingStatus = true;
    const user: User = this.signUpForm.value;
    let method: string = HttpService.POST;
    let url: string = HttpService.USER_PATH;

    if (this.authService.isAuthorized()) {
      // exisiting user with ID and dashboards
      method = HttpService.PUT;
      user.id = this.authService.user.id;
      user.dashboards = this.authService.user.dashboards;
      url += "/"+this.authService.user.id;
    }

    console.log(user);
    this.subscription = this.httpService.requestApi(url, method, user)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.loadingStatus = false;
          this.responseStatus = response.status;
          if (this.isAuthorized()) this.authService.refresh(<User>response.data);
          this.refresh();
        },
        (error: CustomResponse) => {
          console.log(error);
          this.loadingStatus = false;
          this.responseStatus = error.status;
          this.errorMessage = error.message;
          this.refresh();
        }
      );
    this.refresh();
  }

  private refresh(): void {
    this.titleVisible = (!this.responseStatus || this.responseStatus == HttpService.STATUS_SERVER_ERROR);
    this.accountCreated = !this.isAuthorized() && !this.loadingStatus && this.responseStatus == HttpService.STATUS_CREATED;
    this.errorCreatingAccount = !this.loadingStatus && this.responseStatus == HttpService.STATUS_SERVER_ERROR;
    this.formVisible = !this.loadingStatus && (!this.responseStatus || this.responseStatus == HttpService.STATUS_SERVER_ERROR || (this.responseStatus == HttpService.STATUS_OK && this.isAuthorized()) );
    this.accountEdited = this.isAuthorized() && !this.loadingStatus && this.responseStatus == HttpService.STATUS_OK;
  }

  isAuthorized(): boolean {
    return this.authService.isAuthorized();
  }
  ngOnDestroy() {
    if(this.subscription)this.subscription.unsubscribe();
  }
}
