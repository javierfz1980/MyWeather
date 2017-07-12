import {City} from "./city";

export class Dashboard {

  private _id:number;
  private _cities:City[];

  set id(value: number) {
    this._id = value;
  }
  set cities(value: City[]) {
    this._cities = value;
  }

  get id(): number {
    return this._id;
  }
  get cities(): City[] {
    return this._cities;
  }

}
