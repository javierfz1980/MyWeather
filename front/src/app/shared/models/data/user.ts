import {Dashboard} from "./dashboard";
export class User {

  private _id: string;
  private _name: string;
  private _lastname: string
  private _email: string;
  private _password: string;
  private _gender: string;
  private _age: number;
  private _dashboard: string;
  private _dashboards: Dashboard[];

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get lastname(): string {
    return this._lastname;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get gender(): string {
    return this._gender;
  }

  get age(): number {
    return this._age;
  }

  get dashboard(): string {
    return this._dashboard;
  }

  get dashboards(): Dashboard[] {
    return this._dashboards;
  }


  set id(value: string) {
    this._id = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set password(value: string) {
    this._password = value;
  }

  set gender(value: string) {
    this._gender = value;
  }
  set age(value: number) {
    this._age = value;
  }

  set dashboards(value: Dashboard[]) {
    this._dashboards = value;
  }

  set dashboard(value: string) {
    this._dashboard = value;
  }

}
