import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgForm} from "@angular/forms";

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
export class SignInComponent implements OnInit {

  isCollapsed: boolean = true;
  isForgot: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  signup(form: NgForm): void {
    console.log(form.value);
  }

}
