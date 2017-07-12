import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/models/user";
import {HttpService} from "../../shared/services/http.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private ages:Number[];
  private signUpForm: FormGroup;
  private loadingStatus: boolean = false;
  private titleVisible: boolean = true;
  private responseStatus: string;
  private formVisible: boolean = true;
  private accountCreated: boolean;
  private errorCreatingAccount: boolean;

  constructor(private httpService: HttpService) {

    const user = new User();
    user.name = 'javier';
    user.lastname = 'fernandez';
    user.email = 'javierfz1980@gmail.com';
    user.password = 'asdasd';
    user.age = 37;
    user.gender = ''

    this.ages = Array.from(Array(100),(x,i)=>i);
    this.signUpForm = new FormGroup({
      'name': new FormControl(user.name, Validators.required),
      'lastname': new FormControl(user.lastname, Validators.required),
      'email': new FormControl(user.email, [Validators.required, Validators.email]),
      'password': new FormControl(user.password, Validators.required),
      'confirmPassword': new FormControl('asdasd', Validators.required),
      'age': new FormControl(user.age, Validators.required),
      'gender': new FormControl(user.gender, Validators.required),
      'dashboard': new FormControl('asd', Validators.required)
    });
  }

  ngOnInit() {}

  onSubmit(){
    console.log(this.signUpForm.value);
    this.loadingStatus = true;

    this.httpService.putData('users', this.signUpForm.value).subscribe(
      (response: any) => {
        this.loadingStatus = false;
        this.responseStatus = response.status;
        this.refresh();
        console.log(this.responseStatus);
      },
      (error: Error) => {
        this.loadingStatus = false;
        this.responseStatus = HttpService.STATUS_SERVER_ERROR;
        this.refresh();
        console.log(this.responseStatus);
      }
    );
  }

  private refresh(): void {
    this.titleVisible = !this.loadingStatus && (!this.responseStatus || this.responseStatus == HttpService.STATUS_SERVER_ERROR);
    this.accountCreated = !this.loadingStatus && this.responseStatus == HttpService.STATUS_CREATED;
    this.errorCreatingAccount = !this.loadingStatus && this.responseStatus == HttpService.STATUS_SERVER_ERROR;
    this.formVisible = !this.loadingStatus && (!this.responseStatus || this.responseStatus == HttpService.STATUS_SERVER_ERROR);
  }

}
