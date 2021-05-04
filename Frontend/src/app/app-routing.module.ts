import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrarseComponent } from './Components/registrarse/registrarse.component';
import { Reporte1Component } from './Components/reporte1/reporte1.component';
import { Reporte2Component } from './Components/reporte2/reporte2.component';
import { Reporte3Component } from './Components/reporte3/reporte3.component';
import { Reporte4Component } from './Components/reporte4/reporte4.component';
import { Reporte5Component } from './Components/reporte5/reporte5.component';
import { TransaccionComponent } from './Components/transaccion/transaccion.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'registrarse',
    component: RegistrarseComponent
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },
  {
    path:'reporte1',
    component: Reporte1Component
  },
  {
    path:'reporte2',
    component: Reporte2Component
  },
  {
    path:'reporte3',
    component: Reporte3Component
  },
  {
    path:'reporte4',
    component: Reporte4Component
  },
  {
    path:'reporte5',
    component: Reporte5Component
  },
  {
    path:'transaccion',
    component: TransaccionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
