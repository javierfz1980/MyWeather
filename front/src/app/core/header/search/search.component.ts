import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {WeatherService} from "../../../dashboard/services/weather.service";
import {Weather} from "../../../shared/models/data/weather";
import {Observable, Subject, Subscription} from "rxjs";
import {CustomResponse} from "../../../shared/models/http/CustomResponse";
import {AuthService} from "../../../auth/services/auth.service";
import {DashboardService} from "../../../dashboard/services/dashboard.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild('input') input: ElementRef;
  private loading: boolean;
  private isfocus: boolean = false;
  private menuIsOpen: boolean = false;
  private subscription: Subscription;
  private searchStr = new Subject<string>();
  private results: Weather[];

  constructor(private weatherService: WeatherService,
              private authService: AuthService,
              private dashboardService: DashboardService) { }

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

  closeSubMenu(): void{
    setTimeout(
      () => {
        if(this.isfocus && !this.menuIsOpen) {
          this.input.nativeElement.blur();
          this.isfocus = false;
        }
      }, 50
    );
  }

  openSubMenu(): void{
    this.isfocus = true;
  }

  mouseOver() :void{
    this.menuIsOpen = true;
  }

  mouseOut() :void{
    this.menuIsOpen = false;
    this.closeSubMenu();
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }


  private isAuthorized(): boolean{
    return this.authService.isAuthorized();
  }

  private addToDashboard(weather: Weather): void{
    this.dashboardService.addWeather(weather);
  }

  private removeFromDashboard(weather: Weather): void{
    this.dashboardService.removeWeather(weather);
  }

  private weatherIsOnCurrentDashboard(weather: Weather): boolean{
    return this.dashboardService.weatherIsOnCurrentDashboard(weather);
  }


}
