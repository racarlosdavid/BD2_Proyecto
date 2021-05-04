import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuarioService/usuario.service';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit {

  entidad_financiera = '';

  constructor(private userService:UsuarioService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/reporte2']);
    }
    
  }

  data_debitos:any[];
  data_creditos:any[];

  ngOnInit(): void {
    
  }

  aceptar(){
    this.userService.getReporte2Debitos(this.entidad_financiera).subscribe(
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

    this.userService.getReporte2Creditos(this.entidad_financiera).subscribe(
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