import {Component, ElementRef, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControl, NgForm} from "@angular/forms";
import {SessionCredentials} from "../models/sessionCredentials";
import {AuthService} from "../services/auth.service";
import {HttpService} from "../../shared/services/http.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../shared/models/navigation/routing/app-routes";
import {CustomResponse} from "../../shared/models/http/CustomResponse";
import {NgFor} from "@angular/common";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [
    trigger('FormFadeIn', [
      state('*', style({
        opacity: '1'
      })),
      transition ('void => *', [
        style({
          opacity: '0'
        }),
        animate(300)
      ])
    ])
  ]
})
export class SignInComponent implements OnInit, OnDestroy {

  isCollapsed: boolean = true;
  isForgot: boolean = false;
  wrongCredentials: boolean = false;

  // subscriptions
  private signInSubscription: Subscription;

  constructor(private httpService: HttpService, private authService: AuthService) { }

  ngOnInit() {
  }

  signin(form: NgForm): void {
    const sessionCredentials: SessionCredentials = form.value;
    this.signInSubscription = this.httpService.requestApi(HttpService.SESSION_PATH, HttpService.POST, sessionCredentials)
      .subscribe(
        (response: CustomResponse) => {
          if (response.status == HttpService.STATUS_OK) {
            this.authService.signIn(response.data);
          }
        },
        (error: CustomResponse) => {
          this.wrongCredentials = true;
        }
    );
    form.reset();
  }

  ngOnDestroy(): void {
    if (this.signInSubscription) this.signInSubscription.unsubscribe();
  }

}
