import { User, Token } from './../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private registerUrl="http://127.0.0.1:3000/api/register";
    private tokinUrl="http://127.0.0.1:3000/api/token"

  constructor(private http: HttpClient,private router:Router) { }
  
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
}
