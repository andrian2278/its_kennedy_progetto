import { DatabaseApiService } from './../../service/database-api.service';
import { User, Sede_Accese } from './../../models/User';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-admin',
  templateUrl: './info-admin.component.html',
  styleUrls: ['./info-admin.component.css']
})
export class InfoAdminComponent implements OnInit {
  item: Sede_Accese[]=[];
  User: User=new User();
  constructor(private route: ActivatedRoute,private _Db:DatabaseApiService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');

      this._Db.getSede_AdminID(parseInt(id)).subscribe(data => {
        this.item = data;
      });
      this._Db.getAdminId(parseInt(id)).subscribe(s=>{
        this.User=s
        
      })
    });
  }

}
