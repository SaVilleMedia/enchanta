import { Selector } from '@ngxs/store';
import { AuthState, IAuthState } from './auth.state';

export class AuthSelectors {
  @Selector([AuthState])
  static accessToken(state: IAuthState): string | undefined {
    if (state?.access_token && state?.access_token?.length > 0) {
      return state.access_token;
    }
    return undefined;
  }

  @Selector([AuthState])
  static isAuthenticated(state: IAuthState): boolean {
    return !!state.access_token;
  }
}
