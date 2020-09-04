import { DatabaseApiService } from './../../service/database-api.service';
import { User, PC, Hw } from './../../models/User';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.css']
})
export class ComputerComponent implements OnInit {
  user: User = new User();
  id: any;
  Hw:Hw[]=[];
  listaHw: Hw[]=[];
  listaPC: PC[] = [];
  hw: Hw = new Hw();
  pc: PC=new PC();
  DataFiltre:string;
  constructor(private route: ActivatedRoute, private _DB: DatabaseApiService) { }

  newhw() {
    this.hw.Cpu;
    this.hw.Memoria;
    this.hw.Ram;
    this.hw.Tipo_memoria;
    this.hw.marca;
    this.hw.modello;
    if (confirm('Sei sicuro che vorrei aggiungere nuovo HW???')) {
      this._DB.postHw(this.hw).subscribe(_ => {
        this.ngOnInit();
        alert('GooD')
        this.clearValori();
      });
    }
  }
  clearValori(){
    this.hw.Cpu=null;
    this.hw.Memoria=null;
    this.hw.Ram=null;
    this.hw.Tipo_memoria=null;
    this.hw.marca=null;
    this.hw.modello=null;
  }

newPc(){
  this.pc.HW_idHW;
  this.pc.Seriale;
  this.pc.n_fattura;
  this.pc.n_inventario;
  this.pc.data_Acquisto;
  this.pc.note; 
  this.pc.SEDE_idSEDE=this.id; 
  this.pc.STATO_idSTATO=1;
  if (confirm('Sei sicuro che vorrei aggiungere nuovo HW???')) {
    this._DB.postPC(this.pc).subscribe(_ => {
      this.ngOnInit();
      alert('GooD')
    });
  } 
}
HwList(){
this._DB.getHw().subscribe(x=>{
  this.listaHw=x
})  
}

cancelDate(){
  this.listaHw=null
}



  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      this.id = id
    });
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.user = payLoad;

    this._DB.getListPC(this.id).subscribe(x => {
      this.listaPC = x;
    })
    this._DB.getHw().subscribe(x=>{
      this.Hw=x
    })  

  }

}
