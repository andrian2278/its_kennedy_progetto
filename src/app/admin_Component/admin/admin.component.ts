import { DatabaseApiService } from './../../service/database-api.service';
import { User } from './../../models/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  ListAdmins:User[]=[];
  searchText:string;
  constructor(private _Db:DatabaseApiService) { }

  ngOnInit(): void {
    this._Db.getAdmin().subscribe(a=>{
      this.ListAdmins=a
    })
  }

}
