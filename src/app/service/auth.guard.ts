import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot,CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {
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
            alert('Non hai permesso')
            this._router.navigate(['/Home/sedie']);
            return false;
          }
        }
        return true;
      }
      else {
        this._router.navigate(['/Home/Kennedy']);
        return false;
      }
    }
    canActivateChild(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
      if (localStorage.getItem('token') != null){
        let roles = next.data['permittedRoles'] as Array<string>;
        if(roles){
          if(this._authService.roleMatch(roles)) return true;
          else{
            alert('Non hai permesso')
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