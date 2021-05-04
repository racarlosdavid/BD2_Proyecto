import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { NavigationSesionComponent } from './Components/navigation-sesion/navigation-sesion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrarseComponent } from './Components/registrarse/registrarse.component';
import { Reporte1Component } from './Components/reporte1/reporte1.component';
import { Reporte2Component } from './Components/reporte2/reporte2.component';
import { Reporte3Component } from './Components/reporte3/reporte3.component';
import { Reporte4Component } from './Components/reporte4/reporte4.component';
import { Reporte5Component } from './Components/reporte5/reporte5.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { TransaccionComponent } from './Components/transaccion/transaccion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavigationComponent,
    NavigationSesionComponent,
    RegistrarseComponent,
    Reporte1Component,
    Reporte2Component,
    Reporte3Component,
    Reporte4Component,
    Reporte5Component,
    DashboardComponent,
    TransaccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
