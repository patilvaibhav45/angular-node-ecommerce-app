import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectIfAuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private token: TokenStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.token.getUser();
    if (user) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
