import { User } from './../../models/User';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userModul: User=new User()
  status=false;
  constructor(private api:AuthService) { }
  registerUserData=()=>{
    this.userModul.username;
    this.userModul.password;
    this.userModul.Nome_Admin;
    this.userModul.Cognome_Admin;
    this.userModul.email;
    this.userModul.RUOLO;
    this.userModul.Admin_Status=this.status;
    if (confirm('Sei sicuro che vorrei aggiungere nuovo studente???')) {
      this.api.registerUser(this.userModul).subscribe(_ => {
        alert('Good Sei rigistrato')
        
      });
      
    }
  }



  ngOnInit(): void {
  }

}
