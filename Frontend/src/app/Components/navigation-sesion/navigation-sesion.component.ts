import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-sesion',
  templateUrl: './navigation-sesion.component.html',
  styleUrls: ['./navigation-sesion.component.css']
})
export class NavigationSesionComponent implements OnInit {

  constructor(private router:Router) {
    let usuarioActivo = localStorage.getItem('usuarioActivo');
    if((usuarioActivo == null  ||  usuarioActivo==undefined)){
      this.router.navigate(['']);
      return;
    }
   }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.removeItem('usuarioActivo');
    this.router.navigate(['']);    
  }

}
