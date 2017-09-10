export class Forecast {

  private _day: string
  private _date: string;
  private _low: string;
  private _high: string;
  private _text: string;
  private _code: string;

  set day(value: string) {
    this._day = value;
  }

  set date(value: string) {
    this._date = value;
  }

  set low(value: string) {
    this._low = value;
  }

  set high(value: string) {
    this._high = value;
  }

  set text(value: string) {
    this._text = value;
  }

  set code(value: string) {
    this._code = value;
  }
  get day(): string {
    return this._day;
  }

  get date(): string {
    return this._date;
  }

  get low(): string {
    return this._low;
  }

  get high(): string {
    return this._high;
  }

  get text(): string {
    return this._text;
  }

  get code(): string {
    return this._code;
  }


}
