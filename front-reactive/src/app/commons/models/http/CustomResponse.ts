export class CustomResponse {

  private _status: string;
  private _data: any;
  private _headers: Headers;

  set headers(value: Headers) {
    this._headers = value;
  }
  get headers(): Headers {
    return this._headers;
  }

  set status(value: string) {
    this._status = value;
  }

  set data(value: any) {
    this._data = value;
  }

  get status(): string {
    return this._status;
  }

  get data(): any {
    return this._data;
  }
}
