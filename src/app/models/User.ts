export class User{
    idADMIN:number;
    username:string;
    password:string;
    email:string;
    Nome_Admin:string;
    Cognome_Admin:string;
    token:string;
    RUOLO:string;
    Admin_Status:boolean;
    Sede_IdSede: number;
    Admin_IdAdmin: number;
    
}
export class Token{
    token:string;
}
export class Sede{
    idSEDE:number;
    SEDE:string;
}
export class Sede_Admin{
    Sede_IdSede:number;
    Admin_IdAdmin:number;
    IdSede:number;
    SEDE:string;
}