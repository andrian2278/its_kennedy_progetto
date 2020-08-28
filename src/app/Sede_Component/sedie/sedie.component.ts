import { DatabaseApiService } from './../../service/database-api.service';
import { User, Sede_Admin, Sede, Sede_Accese } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sedie',
  templateUrl: './sedie.component.html',
  styleUrls: ['./sedie.component.css']
})
export class SedieComponent implements OnInit {
  ListSedie: Sede[] = [];
  NewSede: Sede =new Sede();
  Users: User[] = [];
  DateUser: User = new User();
  newAdmin: Sede_Admin = new Sede_Admin();
  sedie_Id: number;
  sede_Acces: Sede_Accese[] = [];
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

  getAll(){
    this._Db.getSedeID_AdminAll(this.sedie_Id).subscribe(all=>{
      this.sede_Acces=all
    })
  }
  clerList(){
    this.sede_Acces=null
  }

  newSede(){
    this.NewSede.SEDE;
    
    if (confirm('Sei sicuro che vorrei aggiungere nuovo studente???')) {
      this._Db.postSede(this.NewSede).subscribe(_ => {
        alert('New Sede')
        this.ngOnInit()
      });}
  }

  ngOnInit(): void {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.DateUser = payLoad;

    this._Db.getSede().subscribe(x => {
      this.ListSedie = x
    })
    this._Db.getSede_AdminID(payLoad.idADMIN).subscribe(data => {
      this.sede_Acces= data;
    });
    this._Db.getAdmin().subscribe(a => {
      this.Users = a
    })
  }


}
