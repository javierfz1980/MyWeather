import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SessionCredentials} from '../../models/sessionCredentials';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  @Input()
  wrongCredentials: boolean = false;

  @Output()
  switchForgotEvent: EventEmitter<any> = new EventEmitter();

  @Output()
  siginEvent: EventEmitter<SessionCredentials> = new EventEmitter();


  switchForgot() {
    this.switchForgotEvent.emit(null);
  }

  signin(form: NgForm) {
    const sessionCredentials: SessionCredentials = form.value;
    this.siginEvent.emit(sessionCredentials);
    form.reset();
  }

}
