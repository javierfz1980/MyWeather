import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {

  @Output()
  switchForgotEvent: EventEmitter<any> = new EventEmitter();

  switchForgot() {
    this.switchForgotEvent.emit(null);
  }

}
