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
    if(this.authService.isAuthorized() && !this.weatherIsOnCurrentDashboard(weather)) {
      this.currentDashboard.weathers.push(weather);
      this.saveData();
    }
  }

  removeWeather(weather: Weather): void{
    if(this.authService.isAuthorized()) {
      this.mapLocasl();
      this.currentDashboard.weathers.forEach(function(weatherOnDashboard, index, dashboards) {
        if (weatherOnDashboard.id == weather.id) {
          dashboards.splice(index, 1);
          return;
        }
      });
      this.saveData();
    }
  }

  weatherIsOnCurrentDashboard(weather: Weather): boolean{
    if(this.authService.isAuthorized()) {
      this.mapLocasl();
      for(let weatherOnDashboard of this.currentDashboard.weathers) {
        if (weatherOnDashboard.id == weather.id) return true;
      }
    }
    return false;
  }

  getWeathersFromCurrentDashboard(): Weather[]{
    if (this.authService.isAuthorized()) {
      this.mapLocasl();
      return this.currentDashboard.weathers;
    }
  }

  private mapLocasl() :void{
    if(this.authService.isAuthorized()) {
      this.user = this.authService.user;
      this.currentDashboard = this.user.dashboards[0];
    }
  }

  private saveData(): void{
    const method: string = HttpService.PUT;
    const url: string = HttpService.DASHBOARD_PATH + "/"+this.currentDashboard.id;
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
}
