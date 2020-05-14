import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  private url="http://localhost:3001/login"
  private usuario:string;
  private token:string;



  //Metodo que llama al endpoint para comprobar usuario y contraseña
  login(usuario):Observable<any>{

    return this.http.post<any>(this.url,usuario);
  }


  //Metodo para decodificar el token
  obtenerToken(auth){
    if(auth!=null){
      return JSON.parse(atob(auth.split(".")[1]))

    }
  }


  //Metodo para guardar el usuario en el stoarage
  guardarUsuario(token){
    let payload=this.obtenerToken(token)
    this.usuario=payload.usuario
    sessionStorage.setItem('usuario',JSON.stringify(this.usuario))
  }

  //Metodo para guardar el token en el storage
  guardarToken(token){
    this.token=token;
    sessionStorage.setItem('token',this.token)
  }


  //Comprobar si el usuario esta autenticado
  isAuthenticated():boolean{
    if(sessionStorage.length>0){
      return true;
    }else{
      return false;
    }
  }


  //Metodo para cerrar sesion
  cerrarSesion():void{
    this.usuario=null;
    this.token=null;
    sessionStorage.clear();
  }


}
