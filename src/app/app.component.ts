import { DatabaseApiService } from './service/database-api.service';
import { Roulo } from './models/ruolo';
import { User } from './models/User';
import { AuthService } from './service/auth.service';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  DateUser: User = new User();
  title = 'kennedy';
  item: User=new User();

  constructor(public _authService: AuthService ,private _Db:DatabaseApiService){}

  ngOnInit(): void {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.DateUser = payLoad;
    
     this._Db.getUser(payLoad.idADMIN).subscribe(data => {
      this.item = data;
    });
  }
}
