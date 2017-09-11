import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Headers, Http, Response} from "@angular/http";
import {CustomResponse} from "../models/http/CustomResponse";
import {AuthService} from "./auth.service";
import {ApplicationState} from '../store/application-state';
import {Store} from '@ngrx/store';
import {User} from '../models/data/user';

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


  constructor(private http: Http, private authService: AuthService, private store$: Store<ApplicationState>){}


  requestApi(url: string, method: string, data?: any, headers?:Headers): Observable<CustomResponse> {
    const source: Observable<CustomResponse> = this.getSource(url, method, data, headers);
    let customResponse: CustomResponse = new CustomResponse();

    return source
      .map(
        (response: any) => {
          console.debug("- httpservice response: ", response);
          customResponse = this.buildCustomResponse(response);
          console.debug("- httpservice response customResponse: ", customResponse);
          return customResponse;
        },
      )
      .catch(
        (error: any) => {
          console.debug("- httpservice error: ", error);
          customResponse = this.buildCustomResponse(error);
          console.debug("- httpservice error customResponse: ", customResponse);
          return Observable.throw(customResponse);
        }
      );

  }

  private getSource(url: string, method: string, data: any, headers?:Headers): Observable<any> {
    const defaultHeaders: Headers = (headers != null ) ? headers : this.creatDefaultHeaders(); // new Headers({'Content-Type': 'application/json'});

    /*console.debug("- url: ",url);
    console.debug("- method: ",method);
    console.debug("- data: ",data);
    console.debug("- headers: ",defaultHeaders);*/

    let source: Observable<any>;
    switch (method) {
      case HttpService.POST:
        source = this.http.post(this.path + url, data, {headers: defaultHeaders})
        break;
      case HttpService.PUT:
        source = this.http.put(this.path + url, data, {headers: defaultHeaders});
        break;
      case HttpService.GET:
        source = this.http.get(this.path + url, {headers: defaultHeaders});
        break;
      case HttpService.DELETE:
        source = this.http.delete(this.path + url, {headers: defaultHeaders});
        break;
    }
    return source;
  }

  private buildCustomResponse(response: any): CustomResponse{
    const customResponse: CustomResponse = new CustomResponse();
    try {
      customResponse.data = response.json();
    } catch (error) {
      customResponse.data = response['_body'];
    }
    customResponse.status = response.status.toString();

    return customResponse;
  }

  private creatDefaultHeaders(): Headers {
    const headers: Headers = new Headers();
    if (this.authService.isAuthorized()) {
      // if user is logged in...
      const user: User = this.getCurrentUser();
      const username: string = user.email;
      const password: string = user.password;
      headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    }
    headers.append('Content-Type', 'application/json');
    return headers;
  }



  private getCurrentUser(): User {
    let user: User;
    this.store$
      .select('user')
      .take(1)
      .subscribe(userState => user = userState.user)
      .unsubscribe();
    return user;
  }

}
