import {Weather} from "./weather";

export class Dashboard {

  private _id: number;
  private _name: string;
  private _weathers: Weather[];

  set id(value: number) {
    this._id = value;
  }
  set weathers(value: Weather[]) {
    this._weathers = value;
  }

  set name(value: string) {
    this._name = value;
  }

  get id(): number {
    return this._id;
  }
  get weathers(): Weather[] {
    return this._weathers;
  }

  get name(): string {
    return this._name;
  }

}
