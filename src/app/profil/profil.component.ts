import { DatabaseApiService } from './../service/database-api.service';
import { ActivatedRoute } from '@angular/router';
import { User, Sede_Accese } from './../models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  title = 'kennedy';
  item: User=new User();
  SedeList:Sede_Accese[]=[];
  constructor(private _Db:DatabaseApiService){}

  ngOnInit(): void {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    
     this._Db.getAdminId(payLoad.idADMIN).subscribe(data => {
      this.item = data;
    });
    this._Db.getSede_AdminID(parseInt(payLoad.idADMIN)).subscribe(data => {
      this.SedeList = data;
    });
  }
}
