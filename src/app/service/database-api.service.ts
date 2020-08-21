import { environment } from './../../environments/environment.prod';
import { Sede_Admin,User ,Sede} from './../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseApiService {
  private _api="http://127.0.0.1:3000/"
  constructor(private http:HttpClient) { }
  getSede(){
    return this.http.get<Sede[]>(this._api+'sede')
  }
  getAdmin_Sdie(){
    return this.http.get<Sede_Admin[]>(`${environment._api}sede/admin`);
  };
  getAdminID(id){
    return this.http.get<User[]>(`${environment._api}sede/admin/`+id);
  }
  postSede_Admin(user){
    return this.http.post<Sede_Admin>(`${environment._api}sede/admin`,user)
  }
  getAdmin(){
    return this.http.get<User[]>(`${environment._api}admin`)
  }
  getUser(id){
    return this.http.get<User>( `${environment._api}admin/`+id)
  }
}
