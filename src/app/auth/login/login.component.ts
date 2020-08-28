import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { User, Token } from './../../models/User';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
authrizato=false;
private _api="http://127.0.0.1:3000/"
  constructor(private api:AuthService,private router: Router) { }
  loginModule: User=new User()
  Reloud(){
    window.location.reload()
  }
  loginUser=()=>{
    this.loginModule.username;
    this.loginModule.password;
    
    if (confirm('Cioa')) {
      this.api.logUser(this.loginModule).subscribe(res => {
        
        localStorage.setItem('token',res.token)
       
       
       this.authrizato=true     
        if (this.authrizato==true) {
         window.location.assign(`${environment.apiUrl}Home/sedie`)
         
       }
      });  
     
    }
  }
  ngOnInit(): void {
    
  }

}
