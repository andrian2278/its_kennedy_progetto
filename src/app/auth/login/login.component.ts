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

  constructor(private api:AuthService,private router: Router) { }
  loginModule: User=new User()
  
  loginUser=()=>{
    this.loginModule.username;
    this.loginModule.password;

    if (confirm('Sei sicuro che vorrei aggiungere nuovo studente???')) {
      
      this.api.logUser(this.loginModule).subscribe(res => {
        alert('Hello')
        localStorage.setItem('token',res.token)
       this.router.navigate(['/sedie']);
      });
      
    }
  }
  ngOnInit(): void {
  }

}
