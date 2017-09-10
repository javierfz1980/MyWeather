import {Forecast} from "./weatherData/forecast";
import {Condition} from "./weatherData/condition";

export class Weather {

  private _id: string;
  private _woeid: string;
  private _title: string;
  private _description: string;
  private _link: string;
  private _pubDate: string;
  private _condition: Condition;
  private _forecast: Forecast[];

  get id(): string {
    return this._id;
  }

  get woeid(): string {
    return this._woeid;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get link(): string {
    return this._link;
  }

  get pubDate(): string {
    return this._pubDate;
  }

  get condition(): Condition {
    return this._condition;
  }

  get forecast(): Forecast[] {
    return this._forecast;
  }
  set id(value: string) {
    this._id = value;
  }

  set woeid(value: string) {
    this._woeid = value;
  }

  set title(value: string) {
    this._title = value;
  }

  set description(value: string) {
    this._description = value;
  }

  set link(value: string) {
    this._link = value;
  }

  set pubDate(value: string) {
    this._pubDate = value;
  }

  set condition(value: Condition) {
    this._condition = value;
  }

  set forecast(value: Forecast[]) {
    this._forecast = value;
  }


}
