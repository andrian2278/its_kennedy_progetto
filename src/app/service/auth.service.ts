import { environment } from './../../environments/environment.prod';
import { Roulo } from './../models/ruolo';
import { User, Token } from './../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   

  constructor(private http: HttpClient,private router:Router,public jwtHelper: JwtHelperService) { }
  
  registerUser(user) {
    return this.http.post<User>(`${environment._api}register`, user)
  }
  logUser(user) {
    return this.http.post<User>(`${environment._api}token`, user)
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }
  
  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/Home/Kennedy'])
    window.location.reload()
  }

  getToken() {
    return localStorage.getItem('token')
  }     
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.RUOLO;

    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
    
  }
  }
