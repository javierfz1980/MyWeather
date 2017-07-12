import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Headers, Http} from "@angular/http";

@Injectable()
export class HttpService {

  private readonly  path: string = 'http://localhost:8080/';

  public static readonly STATUS_OK: string = "200";
  public static readonly STATUS_CREATED: string = "201";
  public static readonly STATUS_SERVER_ERROR: string = "500";

  constructor(private http: Http){}

  putData(url: string, data: any[]): Observable<any> {
    const headers: Headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(this.path + url, data, {headers: headers});
  }
}
