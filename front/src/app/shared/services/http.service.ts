import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Headers, Http, Response} from "@angular/http";
import {CustomResponse} from "../models/http/CustomResponse";

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

  constructor(private http: Http){}

  requestApi(url: string, method: string, data: any): Observable<CustomResponse> {
    const source: Observable<CustomResponse> = this.getSource(url, method, data);
    const customResponse: CustomResponse = new CustomResponse();
    const expectResponseData: boolean = method != HttpService.PUT && method != HttpService.DELETE;
    return source
      .map(
        (response: any) => {
          console.log("httpservice response: ");
          console.log(response);
          console.log("---------------");
          customResponse.data = (expectResponseData) ? response.json() : null;
          customResponse.status = response.status.toString();
          customResponse.message = response['_body'];
          return customResponse;
        },
      )
      .catch(
        (error: any) => {
          console.log("httpservice error: ");
          console.log(error);
          console.log("---------------");
          customResponse.data = null;
          customResponse.status = error['status'];
          customResponse.message = error['_body'];
          return Observable.throw(customResponse);
        }
      );

  }

  private getSource(url: string, method: string, data: any): Observable<any> {
    const headers: Headers = new Headers({'Content-Type': 'application/json'});
    let source: Observable<any>;
    switch (method) {
      case HttpService.POST:
        source = this.http.post(this.path + url, data, {headers: headers})
        break;
      case HttpService.PUT:
        source = this.http.put(this.path + url, data, {headers: headers});
        break;
      case HttpService.GET:

        break;
      case HttpService.DELETE:

        break;
    }
    return source;
  }

}
