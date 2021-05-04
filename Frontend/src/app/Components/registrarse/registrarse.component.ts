import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/Services/usuarioService/usuario.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {

  public rol='';

  constructor(private userService:UsuarioService, private router:Router) {
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/dashboard']);
    }
   }

  usuario:Usuario={
    cui:null,
    nombre:'',
    apellido:'',
    email:'',
    contrasenia:''
  }
  listaRoles:string[] = ['Cuenta Habiente', 'Administrador'];
  listaCouch:string[] = ['Couch', 'Atleta'];
  existe:boolean = false;
  listaDeCouchs:string[]=[];

  ngOnInit(): void {
    this.desplegarMenu()
  }

  desplegarMenu(){
    let element = document.querySelector(".dropdown-toggle")
    let lista = document.querySelector(".dropdown-menu")
    element?.addEventListener('click',function(){
     if (element != null && lista != null && !element.classList.contains('show')){
        console.log(element)
        console.log(lista)
        element.classList.add('show')
        lista.classList.add('show')
     }else if(element != null && lista != null && element.classList.contains('show')){
      element.classList.remove('show')
      lista.classList.remove('show')
     }
    });
  }

  comprobarCampos():boolean{
    if(this.usuario.apellido==''    ||  this.usuario.contrasenia==''
      ||this.usuario.email==''    ||   this.usuario.cui==null
      ||this.usuario.nombre==''   ){
      return false;
    }else{
      return true;
    }
  }

  async registrarse(){

    this.userService.addUser(this.usuario).subscribe(
      res=>{
        alert(res.mensaje)
        this.router.navigate(['/login']);
        /*
        if((<RespuestaInsertarActualizar>res).affectedRows == 0){
          alert('Hubo un problema al ingresar el usuario, intentelo nuevamente');
        }else{
          alert('Usuario ingresado correctamente');
          
        }
        */
      },err=>{
        alert(err.respuesta);
      }
    ) 
/*
    this.userService.checkEmail(this.usuario.email)
    .then(res => {
      console.log('Data', res);
      if (res.length > 0) {
        for (let index = 0; index < res.length; index++) {
          if (res[index].correo === this.usuario.email) {
            console.log(res[index].correo, " ", this.usuario.email);
            this.existe = true;
            break;
          }else{
            this.existe = false;
          }
        }
      } else {
        this.existe = true;
      }
      if (this.existe == true) {
        alert('El email ingresado ya esta asociado a una cuenta en el sistema.');
      } else {
       
        this.userService.addUser(this.usuario).subscribe(
          res=>{
            
            if((<RespuestaInsertarActualizar>res).affectedRows == 0){
              alert('Hubo un problema al ingresar el usuario, intentelo nuevamente');
            }else{
              alert('Usuario ingresado correctamente');
              this.router.navigate(['/login']);
            }
            
          },err=>{
            alert(err.respuesta);
          }
        ) 
      }
      
    })
    .catch(err => {
      console.log(err);
    });
  */
    
  }
}