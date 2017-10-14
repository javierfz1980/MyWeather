import {Weather} from "./weather";

export class Dashboard {

  private _id: string;
  private _name: string;
  private _weathers: Weather[];

  set id(value: string) {
    this._id = value;
  }
  set weathers(value: Weather[]) {
    this._weathers = value;
  }

  set name(value: string) {
    this._name = value;
  }

  get id(): string {
    return this._id;
  }
  get weathers(): Weather[] {
    return this._weathers;
  }

  get name(): string {
    return this._name;
  }

}
