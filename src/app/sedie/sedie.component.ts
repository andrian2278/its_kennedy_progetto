import { DatabaseApiService } from './../service/database-api.service';
import { Roulo } from './../models/ruolo';
import { User, Sede_Admin, Sede } from './../models/User';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sedie',
  templateUrl: './sedie.component.html',
  styleUrls: ['./sedie.component.css']
})
export class SedieComponent implements OnInit {
  ListSedie: Sede[] = [];
  Users: User[] = [];
  listS_Acces: User[] = [];
  DateUser: User = new User();
  S_acces: Sede_Admin = new Sede_Admin();
  newAdmin: Sede_Admin = new Sede_Admin();
  sedie_Id: number;
  constructor(private _authService: AuthService, private _Db: DatabaseApiService) { }
  newUser() {
    this.newAdmin.Admin_IdAdmin;
    this.newAdmin.Sede_IdSede=this.sedie_Id;
    if (confirm('Sei sicuro che vorrei aggiungere nuovo Admin???')) {
      this._Db.postSede_Admin(this.newAdmin).subscribe(_ => {
        this.ngOnInit();

      });
    }

  }





  ngOnInit(): void {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.DateUser = payLoad;

    this._Db.getSede().subscribe(x => {
      this.ListSedie = x
    })
    this._Db.getAdminID(payLoad.idADMIN).subscribe(data => {
      this.listS_Acces = data;
    });
    this._Db.getAdmin().subscribe(a => {
      this.Users = a
    })
  }


}
