import { DatabaseApiService } from './service/database-api.service';
import { User } from './models/User';
import { AuthService } from './service/auth.service';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kennedy';
  item: User=new User();

  constructor(public _authService: AuthService ,private _Db:DatabaseApiService){}

  ngOnInit(): void {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    
     this._Db.getAdminId(payLoad.idADMIN).subscribe(data => {
      this.item = data;
    });
  }
}
