import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private _route: Router, private token: TokenStorageService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const currentUser = this.token.getUser();
    if (currentUser) {
      return true;
    }
    this._route.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
