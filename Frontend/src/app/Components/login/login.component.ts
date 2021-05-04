import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/Services/usuarioService/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:string='';
  public contrasenia:string='';

  constructor(private userService:UsuarioService, private router:Router) { 
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     
    if(!(usuarioActivo==null  ||  usuarioActivo==undefined)){
      router.navigate(['/dashboard']);
    }
    
  }

  public iniciarSesion() {
    localStorage.removeItem('usuarioActivo');
    if (this.comprobarCampos(this.email, this.contrasenia)) {
      this.userService.login(this.email, this.contrasenia).subscribe(
        res => {
          if(res.length > 0){
            alert('Ingreso Exitoso');
            localStorage.setItem('usuarioActivo', JSON.stringify(res[0]));
            localStorage.setItem('cui', JSON.stringify(res[0].cui));
            localStorage.setItem('nombre', JSON.stringify(res[0].nombre));
            localStorage.setItem('apellido', JSON.stringify(res[0].apellido));
            this.router.navigate(['/dashboard']);
          }else{
            alert('Error al ingresar credenciales');
          }
          return true;
        },
        err => {
          //console.log(err);
          console.log(err.respuesta)
          return false;
        }
      );
    }
    return false;
  }

  public comprobarCampos(email:string, contrasenia:string) {
    if (email == '') {
      alert('Llene el campo de correo electronico');
      return false;
    } else if (contrasenia == '') {
      alert('Llene el campo contrasenia');
      return false;
    }
    return true;
  }

  ngOnInit(): void {
  }

}
