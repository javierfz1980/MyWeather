import {Injectable} from "@angular/core";
import {Weather} from "../../shared/models/data/weather";
import {Observable} from "rxjs";
import {HttpService} from "../../shared/services/http.service";

@Injectable()
export class WeatherService {

  //public weatherList: Observable<Weather[]>;

  constructor(private httpService: HttpService) {}

  search(searchStr: Observable<string>) {
    return searchStr.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(input => this.searchWeatherOnServer(input));
  }

  private searchWeatherOnServer(term): Observable<any> {
    console.log("searchOnApi");
    return this.httpService.requestApi(HttpService.WEATHER_PATH, HttpService.POST, term);
  }


}
