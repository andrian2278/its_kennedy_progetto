import { User } from './../../../Fastify-token-query/models/User';
import { Token } from './../models/User';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) { }
token:Token[]
  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      console.log('true')
      return true
    } else {
      console.log('false')            
      this._router.navigate(['/login'])
      return false
    }
  }
}