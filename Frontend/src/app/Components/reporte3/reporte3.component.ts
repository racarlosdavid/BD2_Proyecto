import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuarioService/usuario.service';

@Component({
  selector: 'app-reporte3',
  templateUrl: './reporte3.component.html',
  styleUrls: ['./reporte3.component.css']
})
export class Reporte3Component implements OnInit {

  constructor(private userService:UsuarioService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/reporte3']);
    }
    
  }

  data:any[];
  ngOnInit(): void {
    this.userService.getReporte3().subscribe(
      res => {
        console.log(res);
        this.data = res;
      },
      err => {
        //console.log(err);
        console.log(err.respuesta)
        return false;
      }
    );
  }

}
