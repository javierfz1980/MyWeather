import {City} from "./city";

export class Dashboard {

  private _id: number;
  private _name: string;
  private _cities: City[];

  set id(value: number) {
    this._id = value;
  }
  set cities(value: City[]) {
    this._cities = value;
  }

  set name(value: string) {
    this._name = value;
  }

  get id(): number {
    return this._id;
  }
  get cities(): City[] {
    return this._cities;
  }

  get name(): string {
    return this._name;
  }

}
