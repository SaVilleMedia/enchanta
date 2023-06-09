import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AuthSelectors } from './auth.selectors';

interface CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree;
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  @Select(AuthSelectors.isAuthenticated) $isAuthenticated:
    | Observable<boolean>
    | undefined;
  constructor(private store: Store) {}

  // TODO: Explore using an async way to validate routes
  async test() {
    return 1;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // TODO: Check claims for the route and implement role-based authorization
    // TODO: Route to the correct route after login
    // Route and state will be used once we have user roles
    return this.store.selectSnapshot(AuthSelectors.isAuthenticated);
  }
}
