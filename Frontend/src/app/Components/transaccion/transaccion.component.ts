import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuarioService/usuario.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {

  ngOnInit(): void {
    
  }

  cui = null;
  nombre = '';
  apellido = '';
  entidadFinanciera = '';
  tipoCuenta = '';
  saldo_inicial = 0;

  cui2 = null;
  nombre2 = '';
  apellido2 = '';
  entidadFinanciera2 = '';
  tipoCuenta2 = '';
  saldo_inicial2 = 0;

  montoTransferencia = null;

  data_getsaldo:any[];

  constructor(private userService:UsuarioService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/transaccion']);
    }
    
  }

  aceptar(){

    this.userService.getSaldo(this.cui, this.nombre, this.apellido, this.entidadFinanciera, this.tipoCuenta).subscribe(
      res => {
        this.data_getsaldo = res;
        if(this.data_getsaldo.length > 0){
          this.saldo_inicial = res[0].saldo_inicial;
          let saldo_disponible:number = this.data_getsaldo[0].saldo_inicial;
          let saldo_a_transferir:number = this.montoTransferencia;
          if (saldo_disponible >= saldo_a_transferir) {

            this.userService.getSaldo(this.cui2, this.nombre2, this.apellido2, this.entidadFinanciera2, this.tipoCuenta2).subscribe(
              res => {
                if(res.length > 0){
                  this.saldo_inicial2 = res[0].saldo_inicial;
                
                  //YA QUE LA CUENTA A DEBITAR TIENE SALDO Y LA CUENTA A ACREDITAR EXISTE 
                  //SE HACE LA TRANSFERENCIA
                  
                  this.userService.addTransacccion(this.cui, this.nombre, this.apellido, this.entidadFinanciera, this.tipoCuenta, this.saldo_inicial, this.cui2, this.nombre2, this.apellido2, this.entidadFinanciera2, this.tipoCuenta2, this.saldo_inicial2, this.montoTransferencia).subscribe(
                    res=>{
                      alert(res.mensaje);
                      this.router.navigate(['/dashboard']);
                    },err=>{
                      alert(err.respuesta);
                    }
                  );
                  

                }else{
                  alert('Error cuenta a acreditar no existe');
                }
              },
              err => {
                //console.log(err);
                console.log(err.respuesta)
                return false;
              }
            );
          }else{
            alert('Saldo insuficiente para realizar operacion');
          }
        }else{
          alert('Error cuenta a debitar no existe');
        }
      },
      err => {
        //console.log(err);
        console.log(err.respuesta)
        return false;
      }
    );
    
    
  
  }


  

}