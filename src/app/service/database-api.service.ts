import { environment } from './../../environments/environment.prod';
import { Sede_Admin, User, Sede, Sede_Accese, Students, Corso, Stato, Hw, PC } from './../models/User';
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
  filtroCorso(id,corso){
    return this.http.get<Students[]>(`${environment._api}`+id+`/students/corso/`+corso) 
  }
  filtroNome(id,nome){
    return this.http.get<Students[]>(`${environment._api}`+id+`/students/nome/`+nome)
  }
  filtroCognome(id,cognome){
    return this.http.get<Students[]>(`${environment._api}`+id+`/students/cognome/`+cognome)
  }
  filtroComune(id,comune){
    return this.http.get<Students[]>(`${environment._api}`+id+`/students/comune/`+comune)
  }
  // ----------------------------------------------------------------------------------------------
  
  getCorsi(id){
    return this.http.get<Corso[]>(`${environment._api}corso/`+id)
  }
  
  postNewCorso(CorsoNew){
    return this.http.post<Corso>(`${environment._api}corso`,CorsoNew)
  }
  // -------------------------------------------------------------------------------------------------------------------
  getStatoRitiro(){
    return this.http.get<Stato>(`${environment._api}stato/ritiro`)
  }
  getStatoConsegna(){
    return this.http.get<Stato>(`${environment._api}stato/consegna`)
  }
  getStatoGuasto(){
    return this.http.get<Stato>(`${environment._api}stato/guasto`)
  }
  getStatoRiparazione(){
    return this.http.get<Stato>(`${environment._api}stato/riparazione`)
  }
  getStatoKO(){
    return this.http.get<Stato>(`${environment._api}stato/KO`)
  }
  // ----------------------------------------------------------------------------------------------------
  getHw(){
    return this.http.get<Hw[]>(`${environment._api}sede/hw`)
  }
  postHw(hw){
    return this.http.post<Hw>(`${environment._api}sede/hw`,hw)
  }
  // -----------------------------------------------------------------------------------------------
  getListPC(id){
    return this.http.get<PC[]>(`${environment._api}sede/`+id+`/pc`)
  }
  getID_PC(idsede,idpc){
    return this.http.get<PC[]>(`${environment._api}sede/`+idsede+`/pc`+idpc)
  }
  postPC(newpc){
    return this.http.post<PC>(`${environment._api}sede/pc`,newpc)
  }
  //-----FiltrePC---------------------------------------------------------------------------------------
  FiltreSeriale(id,seriale){
    return this.http.get<PC[]>(`${environment._api}sede/`+id+`/pc/filtre/seriale/`+seriale)
  }
  FiltreCpu(id,cpu){
    return this.http.get<PC[]>(`${environment._api}sede/`+id+`/pc/filtre/cpu/`+cpu)
  }
}
