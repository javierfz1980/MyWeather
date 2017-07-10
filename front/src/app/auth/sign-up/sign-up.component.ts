import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  private ages:Number[];

  constructor() {
    this.ages = Array.from(Array(100),(x,i)=>i);
  }

  ngOnInit() {}

  onSubmit(form:NgForm){
    console.log(form);
  }

}
