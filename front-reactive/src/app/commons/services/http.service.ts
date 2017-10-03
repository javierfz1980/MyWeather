import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Headers, Http} from "@angular/http";
import {CustomResponse} from "../models/http/CustomResponse";
import {AuthService} from "./auth.service";
import {ApplicationState} from '../store/application-state';
import {Store} from '@ngrx/store';

@Injectable()
export class HttpService {

  private readonly  path: string = 'http://localhost:8080/';

  public static readonly POST: string = "post";
  public static readonly PUT: string = "put";
  public static readonly GET: string = "get";
  public static readonly DELETE: string = "delete";

  public static readonly USER_PATH: string = "users/";
  public static readonly SESSION_PATH: string = "session/";
  public static readonly WEATHER_PATH: string = "weathers/";


  constructor(private http: Http, private authService: AuthService, private store$: Store<ApplicationState>){}


  requestApi(url: string, method: string, data?: any, headers?:Headers): Observable<CustomResponse> {
    const source: Observable<CustomResponse> = this.getSource(url, method, data, headers);
    let customResponse: CustomResponse = new CustomResponse();

    return source
      .map(
        (response: any) => {
          console.debug("---> httpservice response: ", response);
          customResponse = this.buildCustomResponse(response);
          console.debug("---> httpservice response customResponse: ", customResponse);
          return customResponse;
        },
      )
      .catch(
        (error: any) => {
          console.debug("---> httpservice error: ", error);
          customResponse = this.buildCustomResponse(error);
          console.debug("---> httpservice error customResponse: ", customResponse);
          return Observable.throw(customResponse);
        }
      );

  }

  private getSource(url: string, method: string, data: any, headers?:Headers): Observable<any> {
    const isSessionRequest: boolean = url.indexOf(HttpService.SESSION_PATH) !== -1;
    const includeToken: boolean = (!isSessionRequest) || (isSessionRequest && method === HttpService.POST);
    const defaultHeaders: Headers = (headers != null ) ? headers : this.creatDefaultHeaders(includeToken);
    console.debug("---> httpservice request: ", {url: url, method: method, data: data, headers: defaultHeaders});

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
    customResponse.headers = response.headers;

    return customResponse;
  }

  private creatDefaultHeaders(includeToken: boolean): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (includeToken) headers.append("Authorization", this.authService.getToken());
    return headers;
  }

}
