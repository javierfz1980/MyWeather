export class CustomResponse {

  private _status: string;
  private _message: string;
  private _data: any;

  set status(value: string) {
    this._status = value;
  }

  set message(value: string) {
    this._message = value;
  }

  set data(value: any) {
    this._data = value;
  }

  get status(): string {
    return this._status;
  }

  get message(): string {
    return this._message;
  }

  get data(): any {
    return this._data;
  }
}
