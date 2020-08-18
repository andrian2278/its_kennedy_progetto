import { 
  AuthGuard as AuthGuard} from './service/auth.guard';

import { 
  RoleGuardService as RoleGuard 
} from './service/role-guard.service';
import { AdminComponent } from './admin/admin.component';

import { SedieComponent } from './sedie/sedie.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';


const routes: Routes = [
  {

    path: '',
    redirectTo: '/Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'sedie',
    canActivate: [AuthGuard],
    component: SedieComponent
  },
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard], 
    data :{permittedRoles:['Admin','utente']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    RoleGuard]
})
export class AppRoutingModule { }
