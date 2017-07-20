export class Condition {

  private _text: string;
  private _code: string;
  private _temp: string;
  private _date: string;

  set text(value: string) {
    this._text = value;
  }

  set code(value: string) {
    this._code = value;
  }

  set temp(value: string) {
    this._temp = value;
  }

  set date(value: string) {
    this._date = value;
  }
  get text(): string {
    return this._text;
  }

  get code(): string {
    return this._code;
  }

  get temp(): string {
    return this._temp;
  }

  get date(): string {
    return this._date;
  }

}
