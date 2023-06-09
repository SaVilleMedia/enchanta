import { ILoginCredentials } from '../../api';
export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: ILoginCredentials) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class ClearAuthErrors {
  static readonly type = '[Auth] Clear Erros';
}
