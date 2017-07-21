import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../../../boards/services/weather.service";
import {Weather} from "../../../shared/models/data/weather";
import {Observable, Subject, Subscription} from "rxjs";
import {CustomResponse} from "../../../shared/models/http/CustomResponse";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  private loading: boolean;
  private isfocus: boolean = false;
  private subscription: Subscription;
  private searchStr = new Subject<string>();
  private results: Weather[];

  constructor(private weatherService: WeatherService, private authService: AuthService) { }

  ngOnInit(): void {
   this.subscription = this.weatherService.search(this.searchStr)
      .subscribe(
        (results: CustomResponse) => {
          this.results = results.data;
          this.loading = false;
        },
        (error: Error) => {
          this.results = null;
          this.loading = false;
        }
      );
  }

  inputSearch(str: string): void{
    if(str && str != '' && str != undefined) {
      this.loading = true;
      this.searchStr.next(str);
    }
  }

  onBlur(): void{
    this.isfocus = false;
  }

  onFocus(): void{
    this.isfocus = true;
  }

  isAuthorized(): boolean{
    return this.authService.isAuthorized();
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }



}
