import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatabaseApiService } from './../../service/database-api.service';
import { User, Sede_Accese } from './../../models/User';
@Component({
  selector: 'app-component-sede',
  templateUrl: './component-sede.component.html',
  styleUrls: ['./component-sede.component.css']
})
export class ComponentSedeComponent implements OnInit {
id: any;
  constructor(private route: ActivatedRoute,private _Db:DatabaseApiService) { }
  DateUser: User = new User();
  ngOnInit(): void {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.DateUser = payLoad;

    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      this.id =id
       console.log(id)
  });
}

}
