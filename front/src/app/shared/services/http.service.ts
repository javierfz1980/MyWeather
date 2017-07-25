import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Headers, Http, Response} from "@angular/http";
import {CustomResponse} from "../models/http/CustomResponse";
import {AuthService} from "../../auth/services/auth.service";

@Injectable()
export class HttpService {

  private readonly  path: string = 'http://localhost:8080/';

  public static readonly STATUS_OK: string = "200";
  public static readonly STATUS_CREATED: string = "201";
  public static readonly STATUS_SERVER_ERROR: string = "500";
  public static readonly UNAUTHORIZED: string = "401";

  public static readonly POST: string = "post";
  public static readonly PUT: string = "put";
  public static readonly GET: string = "get";
  public static readonly DELETE: string = "delete";

  public static readonly USER_PATH: string = "users";
  public static readonly SESSION_PATH: string = "session";
  public static readonly WEATHER_PATH: string = "weathers";
  public static readonly DASHBOARD_PATH: string = "dashboards";


  constructor(private http: Http, private authService: AuthService){}


  requestApi(url: string, method: string, data: any, headers?:Headers): Observable<CustomResponse> {
    const source: Observable<CustomResponse> = this.getSource(url, method, data, headers);
    let customResponse: CustomResponse = new CustomResponse();

    return source
      .map(
        (response: any) => {
          console.log("httpservice response: ");
          console.log(response);
          console.log("---------------");
          customResponse = this.buildCustomResponse(response);
          return customResponse;
        },
      )
      .catch(
        (error: any) => {
          console.log("httpservice error: ");
          console.log(error);
          console.log("---------------");
          customResponse = this.buildCustomResponse(error);
          return Observable.throw(customResponse);
        }
      );

  }

  private getSource(url: string, method: string, data: any, headers?:Headers): Observable<any> {
    const defaultHeaders: Headers = (headers != null ) ? headers : this.creatDefaultHeaders(); // new Headers({'Content-Type': 'application/json'});
    let source: Observable<any>;
    switch (method) {
      case HttpService.POST:
        source = this.http.post(this.path + url, data, {headers: defaultHeaders})
        break;
      case HttpService.PUT:
        source = this.http.put(this.path + url, data, {headers: defaultHeaders});
        break;
      case HttpService.GET:

        break;
      case HttpService.DELETE:

        break;
    }
    return source;
  }

  private buildCustomResponse(response: any): CustomResponse{
    const customResponse: CustomResponse = new CustomResponse();
    try {
      customResponse.data = response.json();
    } catch (error) {
      customResponse.data = null;
    }
    customResponse.status = response.status.toString();
    customResponse.message = response['_body'];

    return customResponse;
  }

  private creatDefaultHeaders(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // if user is logged in...
    if (this.authService.isAuthorized()) {
      const username: string = this.authService.user.email;
      const password: string = this.authService.user.password;
      headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    }
    return headers;
  }

}
