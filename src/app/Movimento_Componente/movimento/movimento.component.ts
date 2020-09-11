import { DatabaseApiService } from './../../service/database-api.service';
import { Movimento, PC, Students, Sede } from './../../models/User';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movimento',
  templateUrl: './movimento.component.html',
  styleUrls: ['./movimento.component.css']
})
export class MovimentoComponent implements OnInit {
  // data_consegna,cavo_rete,alimentatore,borsa,mouse,hdd,con_ethernet,con_usb,note,note_movimento,PC_idPC,UTENTE_idUTENTE,ADMIN_idADMIN
  id:any;
  id_pc:any;
  id_Admin:any;
  id_Stato:any;
  
  Lista_Movimenti:Movimento[]=[];
  New_Movimento:Movimento=new Movimento();
  Lista_PC:PC[]=[];
  Lista_Studente:Students[]=[];
  SedeDate:Sede=new Sede()
  upPC:PC=new PC();

  constructor(private route: ActivatedRoute,private _Db:DatabaseApiService) { }
  PCup(){
    this.upPC.idpc;
    this.upPC.STATO_idSTATO;
    this._Db.updatePC(this.id_pc,this.upPC).subscribe(x=>{})
   }
  AddConsegna(){
    this.New_Movimento.PC_idpc;
    this.New_Movimento.UTENTE_idUTENTE;
    this.New_Movimento.ADMIN_idADMIN=this.id_Admin;
    this.New_Movimento.data_consegna= new Date();
    this.New_Movimento.alimentatore;
    this.New_Movimento.borsa;
    this.New_Movimento.cavo_rete;
    this.New_Movimento.con_ethernet;
    this.New_Movimento.con_usb;
    this.New_Movimento.hdd;
    this.New_Movimento.note;
    this.New_Movimento.note_movimento=this.SedeDate.SEDE;
    this.New_Movimento.STATO_idSTATO;
    if (confirm('Sei sicuro che vorrei aggiungere nuovo Movimento???')) {
      this._Db.postMovimenti(this.New_Movimento).subscribe(_ => {
        this.ngOnInit();
        alert('GooD')
      this.PCup()
      });
      
    }
  }
  
  GetPC_Disponibili(){
    this._Db.getPC_Stato(this.id).subscribe(x=>{
      this.Lista_PC=x
    })
  }
  GetPC_status(id_query){
    this._Db.getPc_IdStatus(this.id,id_query).subscribe(x=>{
      this.Lista_PC=x
    })
  }

  ngOnInit(): void {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.id_Admin=payLoad.idADMIN
    console.log(this.id_Admin)

    
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      this.id =id
      this._Db.getSede_StudentsId(id).subscribe(x=>{
        this.Lista_Studente=x;
      })
      this._Db.getSedeID(id).subscribe(x=>{
        this.SedeDate=x
      })
  });
 console.log(this.id_Stato)
  }
}
