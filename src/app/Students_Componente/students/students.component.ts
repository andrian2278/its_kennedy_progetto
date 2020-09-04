import { Students, User, Corso } from './../../models/User';
import { DatabaseApiService } from './../../service/database-api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  id_Sede: any;
  Datafilter:string;

  DateUser: User = new User();
  StudentsList: Students[] = []
  ListCorsi: Corso[] = [];
  newCorso: Corso = new Corso();
  newStudents: Students = new Students();

  constructor(private route: ActivatedRoute, private _Db: DatabaseApiService) { }

  save = () => {
    this.newStudents.nome;
    this.newStudents.cognome; 
    this.newStudents.data_nascita;
    this.newStudents.luogo_nascita;
    this.newStudents.comune;
    this.newStudents.civico;
    this.newStudents.via;
    this.newStudents.provincia_sigla;
    this.newStudents.frequentazione = true;
    this.newStudents.CORSO_idCORSO;

    if (confirm('Sei sicuro che vorrei aggiungere nuovo studente???')) {
      this._Db.newStudente(this.newStudents).subscribe(_ => {
        this.ngOnInit();
        alert('GooD')
        this.ClearValue();
      });
    }
    
  }

ClearValue(){
  this.newStudents.nome=null;
  this.newStudents.cognome=null; 
  this.newStudents.data_nascita=null;
  this.newStudents.luogo_nascita=null;
  this.newStudents.comune=null;
  this.newStudents.civico=null;
  this.newStudents.via=null;
  this.newStudents.provincia_sigla=null;
  this.newStudents.frequentazione =null;
  this.newStudents.CORSO_idCORSO=null;
}

  AddCorso() {
    this.newCorso.CORSO;
    this.newCorso.SEDE_idSEDE = this.id_Sede;
    if (confirm("Corso aggiunto")) {
      this._Db.postNewCorso(this.newCorso).subscribe(_ => {
        this.ngOnInit();
      })

    }
  }
 filtreNome(){
   this._Db.filtroNome(this.id_Sede,this.Datafilter).subscribe(x=>{
     this.StudentsList =x
   })
 }
 filtreCognome(){
  this._Db.filtroCognome(this.id_Sede,this.Datafilter).subscribe(x=>{
    this.StudentsList =x
  })
}
 filtreCorso(){

  this._Db.filtroCorso( this.id_Sede,this.Datafilter).subscribe(x=>{
   this.StudentsList =x
 })
}
filtreComune(){
  this._Db.filtroComune(this.id_Sede,this.Datafilter).subscribe(x=>{
   this.StudentsList =x
 })
}
GetAll(){
  this._Db.getSede_StudentsId(this.id_Sede).subscribe(x => {
    this.StudentsList = x;

  })
}
  ngOnInit(): void {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.DateUser = payLoad;

    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      this.id_Sede = id;


      this._Db.getSede_StudentsId(id).subscribe(x => {
        this.StudentsList = x;

      })
      this._Db.getCorsi(id).subscribe(z => {
        this.ListCorsi = z;
        
      })
      
    });
    
  }

}
