import { User } from './../models/User';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 DateUser:User=new User();
  constructor(public _authService:AuthService) {
    }
  

  ngOnInit(): void {
 
  }
}
