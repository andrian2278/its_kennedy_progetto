import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sedie',
  templateUrl: './sedie.component.html',
  styleUrls: ['./sedie.component.css']
})
export class SedieComponent implements OnInit {

  constructor(public _authService: AuthService){}

  ngOnInit(): void {
  }

}
