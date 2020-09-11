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
export class Stato{
    idSTATO:number;
    ritiro:boolean;
    consegna:boolean;
    guasto:boolean;
    riparazione:boolean;
    KO:boolean;
}
export class Hw {
    idHW: number;
    Cpu: string;
    Ram: number;
    Memoria: number;
    Tipo_memoria: string;
    marca: string;
    modello: string;
}
export class PC {
    idpc: number;
    HW_idHW: number;
    Seriale: string;
    n_inventario: string;
    n_fattura: string;
    data_Acquisto: string;
    note: string;
    SEDE_idSEDE: number;
    STATO_idSTATO: number;
    ritiro: boolean;
    consegna: boolean;
    guasto:  boolean;
    riparazione:  boolean;
    ko: boolean;
    cpu: string;
    ram: number;
    Memoria: number;
    Tipo_memoria: string;
    marca: string;
    modello: string;
}
export class Movimento {
    data_consegna: Date;
    cavo_rete: number;
    alimentatore: number;
    borsa: number;
    mouse: number;
    hdd: number;
    con_ethernet: number;
    con_usb: number;
    note: string;
    note_movimento: string;
    nome: string;
    cognome: string;
    ADMIN_idADMIN:number;
    UTENTE_idUTENTE:number;
    PC_idpc:number;
    STATO_idSTATO:number;
}
