import { User, Token } from './../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private registerUrl="http://127.0.0.1:3000/api/register";
    private tokinUrl="http://127.0.0.1:3000/api/token"

  constructor(private http: HttpClient,private router:Router,public jwtHelper: JwtHelperService) { }
  
  registerUser(user) {
    return this.http.post<User>(this.registerUrl, user)
  }
  logUser(user) {
    return this.http.post<User>(this.tokinUrl, user)
  }
  loggedIn() {
    return !!localStorage.getItem('token')    
  }
  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/Home'])
  }

  getToken() {
    return localStorage.getItem('token')
  }     
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  }
