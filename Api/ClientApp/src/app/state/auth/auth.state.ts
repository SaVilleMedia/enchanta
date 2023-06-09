import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Action, State, StateContext, StateToken, Store } from '@ngxs/store';
import { Login, Logout, ClearAuthErrors } from './auth.actions';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api';

export interface IError {
  type: string | null;
  title: string | null;
  status: number | null;
  traceId: string | null;
  errors: object | null;
}

export interface IAuthState {
  access_token: string | null;
  userName: string | null;
  errors: IError | null;
}

export const AUTH_STATE_TOKEN = new StateToken<IAuthState>('auth');

@State<IAuthState>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    access_token: null,
    userName: null,
    errors: null,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}

  @Action(Login)
  login(ctx: StateContext<IAuthState>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: any | IError) => {
        console.log('LOGIN RESULT: ', result);

        // if (typeof result === 'string' && result === 'Login failed') {
        //   ctx.setState({
        //     refresh_token: '',
        //     token_type: '',
        //     userName: '',
        //     expiration: '',
        //     expires_in_minutes: 0,
        //     user: {} as IAppUserReadOnlyModel,
        //     errors: {
        //       type: 'Login failed',
        //       title: 'Login failed',
        //       status: 400,
        //       traceId: '',
        //       errors: null,
        //     },
        //   });
        // }
        // // eslint-disable-next-line no-prototype-builtins
        // else if (result.hasOwnProperty('status')) {
        //   ctx.setState({
        //     refresh_token: '',
        //     token_type: '',
        //     userName: '',
        //     expiration: '',
        //     expires_in_minutes: 0,
        //     user: {} as IAppUserReadOnlyModel,
        //     errors: <IError>result,
        //   });
        // } else {
        //   const state = ctx.getState();
        //   const res = result as AuthStateModel;
        //   ctx.setState({
        //     ...state,
        //     ...result,
        //     claims: AuthState.parseJwt(<string>res.access_token).claims,
        //     errors: null,
        //   });
        //   this.router.navigate(['/']);
        // }
      })
    );
  }

  // @Action(Logout)
  // logout(ctx: StateContext<IAuthState>) {
  //   sessionStorage.clear();
  //   this.store.reset({});
  //   ctx.setState({
  //     access_token: '',
  //     refresh_token: '',
  //     token_type: '',
  //     userName: '',
  //     expiration: '',
  //     expires_in_minutes: 0,
  //     user: {} as IAppUserReadOnlyModel,
  //     claims: [],
  //     errors: null,
  //   });
  // }

  static parseJwt(token: string): { claims: string[] } {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const returnObj = JSON.parse(jsonPayload);
    returnObj.claims =
      returnObj['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    return returnObj;
  }

  @Action(ClearAuthErrors)
  clearErrors(ctx: StateContext<IAuthState>) {
    ctx.patchState({ errors: null });
  }
}
