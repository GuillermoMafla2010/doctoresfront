import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario;
  public password;

  constructor(private ls:LoginService,private router:Router) { }

  ngOnInit() {
    this.comprobarLogin()

  }

  comprobarLogin(){

    if(this.ls.isAuthenticated()==true){
      swal.fire('Ya inicio sesscion','Ya etas logueado','info')
      this.router.navigate(['/inicio'])
    }
  }


  guardar(){
let response;
    response={
      email:this.usuario,
      password:this.password
    }



this.ls.login(response).subscribe(x=>{
  //console.log(x)
  if(x.status==400){
    swal.fire('Error',`${x.mensaje}`,'warning')
  }else if(x.status==200){
    swal.fire('Bienvenido','Has ingresado correctamente al sistema','success')
    //console.log(x.token)
    this.router.navigate(['/inicio'])
    //let payload = JSON.parse(atob(x.token.split(".")[1]));
    this.ls.guardarUsuario(x.token);
    this.ls.guardarToken(x.token)
  }
})
  }


}
