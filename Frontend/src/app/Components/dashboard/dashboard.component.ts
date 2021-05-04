import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/dashboard']);
    }

  }

  reporte1(){
    //localStorage.setItem('tipoDato','V');
    //this.router.navigate(['historial']);
    this.router.navigate(['/reporte1']);
  }
  reporte2(){
    //localStorage.setItem('tipoDato','V');
    //this.router.navigate(['historial']);
    this.router.navigate(['/reporte2']);
  }
  reporte3(){
    //localStorage.setItem('tipoDato','V');
    //this.router.navigate(['historial']);
    this.router.navigate(['/reporte3']);
  }
  reporte4(){
    //localStorage.setItem('tipoDato','V');
    //this.router.navigate(['historial']);
    this.router.navigate(['/reporte4']);
  }
  reporte5(){
    //localStorage.setItem('tipoDato','V');
    //this.router.navigate(['historial']);
    this.router.navigate(['/reporte5']);
  }

  ngOnInit(): void {
  }

}
