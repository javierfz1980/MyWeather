import {Injectable} from "@angular/core";
import {Weather} from "../../shared/models/data/weather";
import {AuthService} from "../../auth/services/auth.service";
import {User} from "../../shared/models/data/user";
import {Dashboard} from "../../shared/models/data/dashboard";
import {HttpService} from "../../shared/services/http.service";
import {Subscription} from "rxjs/Subscription";
import {CustomResponse} from "../../shared/models/http/CustomResponse";

@Injectable()
export class DashboardService {

  private user: User;
  private currentDashboard: Dashboard;
  private subscription: Subscription;

  constructor(private authService: AuthService, private httpService: HttpService) {}

  addWeather(weather: Weather): void{
    const method: string = HttpService.POST;
    const url: string = HttpService.USER_PATH + "/" + this.user.id + "/dashboards/" + this.currentDashboard.id + "/weathers";
    this.subscription = this.httpService.requestApi(url, method, weather)
      .subscribe(
        (response: CustomResponse) => {
          console.log("response add weather:");
          console.log(response);
          // adds current weather to local data
          this.currentDashboard.weathers.push(response.data);
        },
        (error: CustomResponse) => {
          console.log("response error add weather:");
          console.log(error);
        }
      );
  }

  removeWeather(weather: Weather): void{
    if(this.authService.isAuthorized()) {
      const method: string = HttpService.DELETE;
      const url: string = HttpService.USER_PATH + "/" + this.user.id + "/dashboards/" + this.currentDashboard.id + "/weathers/" + weather.id;
      this.subscription = this.httpService.requestApi(url, method)
        .subscribe(
          (response: CustomResponse) => {
            console.log("response add weather:");
            console.log(response);
            // removes current weather from local data
            this.mapLocals();
            this.currentDashboard.weathers.forEach( function(weatherOnDashboard, index, currentDashboard) {
              if (weatherOnDashboard.id == response.data['id']) {
                currentDashboard.splice(index, 1);
                return;
              }
            });

          },
          (error: CustomResponse) => {
            console.log("response error add weather:");
            console.log(error);
          }
        );
    }
  }

  weatherIsOnCurrentDashboard(weather: Weather): boolean{
    if(this.authService.isAuthorized()) {
      this.mapLocals();
      for(let weatherOnDashboard of this.currentDashboard.weathers) {
        if (weatherOnDashboard.id == weather.id) return true;
      }
    }
    return false;
  }

  getWeathersFromCurrentDashboard(): Weather[]{
    if (this.authService.isAuthorized()) {
      this.mapLocals();
      return this.currentDashboard.weathers;
    }
  }

  private mapLocals() :void{
    if(this.authService.isAuthorized()) {
      this.user = this.authService.user;
      this.currentDashboard = this.user.dashboards[0];
    }
  }

  /*
  private updateDashboardOnDB(): void{
    ///{userId}/dashboards/{dashboardId}
    const method: string = HttpService.PUT;
    const url: string = HttpService.USER_PATH + "/" + this.user.id + "/dashboards/" + this.currentDashboard.id;
    this.subscription = this.httpService.requestApi(url, method, this.currentDashboard)
      .subscribe(
        (response: any) => {
          console.log("response add weather:");
          console.log(response);
        },
        (error: CustomResponse) => {
          console.log("response error add weather:");
          console.log(error);
        }
      );
  }
  */
}
