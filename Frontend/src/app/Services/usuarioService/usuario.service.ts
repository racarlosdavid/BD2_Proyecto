import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { URL_API } from '../URL';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL = URL_API;

  constructor( private http: HttpClient) { }
  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  public login(email:string, contrasenia:string):Observable<any>{
    return this.http.post(`${this.URL}/login`,{email,contrasenia});
  }

  public checkEmail(email:string):Promise<any>{
    return  this.http.post(`${this.URL}/existeUsuario`,{email}).toPromise();
  }

  public addUser(newuser:Usuario):Observable<any>{
    return  this.http.post(`${this.URL}/newuser`,newuser);
  }

  public getReporte1Debitos(cui:number, nombre:string, apellido:string):Observable<any>{
    return this.http.post(`${this.URL}/reporte1/debitos`,{cui,nombre,apellido});
  }

  public getReporte1Creditos(cui:number, nombre:string, apellido:string):Observable<any>{
    return this.http.post(`${this.URL}/reporte1/creditos`,{cui,nombre,apellido});
  }

  public getReporte2Debitos(entidad_financiera:string):Observable<any>{
    return this.http.post(`${this.URL}/reporte2/debitos`,{entidad_financiera});
  }

  public getReporte2Creditos(entidad_financiera:string):Observable<any>{
    return this.http.post(`${this.URL}/reporte2/creditos`,{entidad_financiera});
  }

  public getReporte3():Observable<any>{
    return this.http.get(`${this.URL}/reporte3`);
  }

  public getReporte4():Observable<any>{
    return this.http.get(`${this.URL}/reporte4`);
  }

  public getReporte5Debitos(cui:number, nombre:string, apellido:string, fecha:string):Observable<any>{
    return this.http.post(`${this.URL}/reporte5/debitos`,{cui,nombre,apellido,fecha});
  }

  public getReporte5Creditos(cui:number, nombre:string, apellido:string, fecha:string):Observable<any>{
    return this.http.post(`${this.URL}/reporte5/creditos`,{cui,nombre,apellido,fecha});
  }

  public getSaldo(cui:number, nombre:string, apellido:string, entidadFinanciera:string, tipoCuenta:string):Observable<any>{
    return this.http.post(`${this.URL}/transaccion/getSaldo`,{cui,nombre,apellido,entidadFinanciera,tipoCuenta});
  }
  
  public addTransacccion(cui:number, nombre:string, apellido:string, entidadFinanciera:string, tipoCuenta:string, saldo_inicial:number, cui2:number, nombre2:string, apellido2:string, entidadFinanciera2:string, tipoCuenta2:string, saldo_inicial2:number, montoTransferencia:number):Observable<any>{
    return this.http.post(`${this.URL}/transaccion/addTransacccion`,{cui,nombre,apellido,entidadFinanciera,tipoCuenta,saldo_inicial,cui2,nombre2,apellido2,entidadFinanciera2,tipoCuenta2,saldo_inicial2,montoTransferencia});
  }

}
