import { environment } from './../../environments/environment.prod';
import { Sede_Admin, User, Sede, Sede_Accese, Students, Corso } from './../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseApiService {
  
  constructor(private http:HttpClient) { }
  getSede(){
    return this.http.get<Sede[]>(`${environment._api}sede`)
  }
  postSede( newsede){
    return this.http.post<Sede>(`${environment._api}sede`,newsede)
  }
  getSede_Admin(){
    return this.http.get<Sede_Admin[]>(`${environment._api}sede/admin`);
  };
  getSede_AdminID(id){
    return this.http.get<Sede_Accese[]>(`${environment._api}sede/admin/`+id);
  }
  getSedeID_AdminAll(id){
    return this.http.get<Sede_Accese[]>(`${environment._api}sede/admin/all/`+id);
  }
  postSede_Admin(user){
    return this.http.post<Sede_Admin>(`${environment._api}sede/admin`,user)
  }
  getAdmin(){
    return this.http.get<User[]>(`${environment._api}admin`)
  }
  getAdminId(id){
    return this.http.get<User>( `${environment._api}admin/`+id)
  }
  // ------------------------------------------------------------------------------------------
  getSede_StudentsId(id){
    return this.http.get<Students[]>( `${environment._api}students/`+id)
  }
  newStudente(studente){
    return this.http.post<Students>(`${environment._api}students`,studente)
  }
  filtroCorso(corso){
    return this.http.get<Students[]>(`${environment._api}students/corso/`+corso) 
  }
  filtroNome(nome){
    return this.http.get<Students[]>(`${environment._api}students/nome/`+nome)
  }
  filtroCognome(cognome){
    return this.http.get<Students[]>(`${environment._api}students/cognome/`+cognome)
  }
  filtroComune(comune){
    return this.http.get<Students[]>(`${environment._api}students/cognome/`+comune)
  }
  // ----------------------------------------------------------------------------------------------
  
  getCorsi(id){
    return this.http.get<Corso[]>(`${environment._api}corso/`+id)
  }
  
  postNewCorso(CorsoNew){
    return this.http.post<Corso>(`${environment._api}corso`,CorsoNew)
  }
}
