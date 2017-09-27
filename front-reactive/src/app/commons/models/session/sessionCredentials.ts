export class SessionCredentials {

  private _email: string;
  private _password: string;

  set email(value: string) {
    this._email = value;
  }
  set password(value: string) {
    this._password = value;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }


}
