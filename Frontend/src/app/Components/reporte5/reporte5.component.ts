import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuarioService/usuario.service';

@Component({
  selector: 'app-reporte5',
  templateUrl: './reporte5.component.html',
  styleUrls: ['./reporte5.component.css']
})
export class Reporte5Component implements OnInit {

  nombre = '';
  apellido = '';
  cui:number = null;
  mes:number = null;
  anio:number = null;
  fecha_inicio = '';
  fecha_fin = '';

  constructor(private userService:UsuarioService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/reporte5']);
    }
    
  }

  data_debitos:any[];
  data_creditos:any[];

  ngOnInit(): void {
    
  }

  aceptar(){
    //fecha >= '2020-04-01 00:00:00' AND fecha < '2020-05-01 00:00:00'
    let n_i:number = this.mes+1;
    this.fecha_inicio = this.anio+'-'+this.mes+'-01 00:00:00'; 
    this.fecha_fin = this.anio+'-'+n_i+'-01 00:00:00';
    let fecha = 'fecha >= \''+this.fecha_inicio+'\' AND fecha < \''+this.fecha_fin+'\'';
  
    console.log(fecha);
    this.userService.getReporte5Debitos(this.cui,this.nombre,this.apellido,fecha).subscribe(
      res => {
        console.log(res);
        this.data_debitos = res;
      },
      err => {
        //console.log(err);
        console.log(err.respuesta)
        return false;
      }
    );

    this.userService.getReporte5Creditos(this.cui,this.nombre,this.apellido,fecha).subscribe(
      res => {
        console.log(res);
        this.data_creditos = res;
      },
      err => {
        //console.log(err);
        console.log(err.respuesta)
        return false;
      }
    );
  }
}