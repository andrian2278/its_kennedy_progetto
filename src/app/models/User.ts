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
export class Sede_Accese{
    Sede_IdSede: number;
    Admin_IdAdmin: number;
    Nome_Admin: string;
    Cognome_Admin: string;
    Username: string;
    Email: string;
    RUOLO: string;
    SEDE: string;
    IdSede: number;
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
export class Students{
    idUTENTE:number;
    nome:string;
    cognome:string;
    data_nascita:Date;
    luogo_nascita:string;
    via:string;
    civico:number;
    comune:string;
    provincia_sigla:string;
    idCorso:number;
    frequentazione:boolean;
    CORSO_idCORSO:number;
    corso:string;
}
export class Corso{
    idCORSO:number;
    CORSO:string;
    SEDE_idSEDE:number;
}