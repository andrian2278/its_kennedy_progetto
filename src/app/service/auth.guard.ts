import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('token') != null){
        let roles = next.data['permittedRoles'] as Array<string>;
        if(roles){
          if(this._authService.roleMatch(roles)) return true;
          else{
            this._router.navigate(['/forbidden']);
            return false;
          }
        }
        return true;
      }
      else {
        this._router.navigate(['/login']);
        return false;
      }
    }
  }