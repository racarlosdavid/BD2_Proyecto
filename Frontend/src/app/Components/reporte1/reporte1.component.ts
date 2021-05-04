import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuarioService/usuario.service';

@Component({
  selector: 'app-reporte1',
  templateUrl: './reporte1.component.html',
  styleUrls: ['./reporte1.component.css']
})
export class Reporte1Component implements OnInit {
  nombre = '';
  apellido = '';
  cui = null;

  constructor(private userService:UsuarioService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/reporte1']);
    }
    
  }

  data_debitos:any[];
  data_creditos:any[];

  ngOnInit(): void {
    
  }

  aceptar(){
    this.userService.getReporte1Debitos(this.cui,this.nombre,this.apellido).subscribe(
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

    this.userService.getReporte1Creditos(this.cui,this.nombre,this.apellido).subscribe(
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
