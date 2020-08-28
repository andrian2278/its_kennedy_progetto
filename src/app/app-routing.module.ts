import { ComponentSedeComponent } from './Sede_Component/component-sede/component-sede.component';
import { InfoAdminComponent } from './admin_Component/info-admin/info-admin.component';
import {
  AuthGuard as AuthGuard
} from './service/auth.guard';

import {
  RoleGuardService as RoleGuard
} from './service/role-guard.service';



import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AdminComponent } from './admin_Component/admin/admin.component';
import { SedieComponent } from './Sede_Component/sedie/sedie.component';
import { StudentsComponent } from './Students_Componente/students/students.component';
import { ComputerComponent } from './PC_Componente/computer/computer.component';
import { MovimentoComponent } from './Movimento_Componente/movimento/movimento.component';
import { WitheBlankComponent } from './withe-blank/withe-blank.component';


const routes: Routes = [
  
  {
    path: '',
    component:  HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'Home',
    component: WitheBlankComponent,
    children:[
      {
        path:'Kennedy',
        component:HomeComponent
      },
      {
        path:'login',
        component:LoginComponent,
      },
      {
        path: 'sedie',
        canActivate: [AuthGuard],
        component: SedieComponent,
      },
      {
        path: 'sedie/:id',
        canActivate: [AuthGuard],
        component: ComponentSedeComponent,
        data: { permittedRoles: ['Admin', 'Moderator'] },
      },
      {
        path: 'sedie/:id/Studenti',
        canActivate: [AuthGuard],
        component: StudentsComponent,
        data: { permittedRoles: ['Admin', 'Moderator'] },
      },
      {
        path: 'sedie/:id/pc',
        canActivate: [AuthGuard],
        component: ComputerComponent,
        data: { permittedRoles: ['Admin', 'Moderator'] },
      },
      {
        path: 'sedie/:id/movumenti',
        canActivate: [AuthGuard],
        component: MovimentoComponent,
        data: { permittedRoles: ['Admin', 'Moderator'] },
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { permittedRoles: ['Admin'] },
    
      },
      {
        path: 'admin/register',
        canActivate: [AuthGuard],
        component: RegisterComponent,
        data: { permittedRoles: ['Admin'] }
      },
      {
        path: 'admin/:id',
        component: InfoAdminComponent,
        canActivate: [AuthGuard],
        data: { permittedRoles: ['Admin'] }
      }
    ]
  },
  
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    RoleGuard]
})
export class AppRoutingModule { }
