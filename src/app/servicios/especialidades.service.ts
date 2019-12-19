import { Injectable } from '@angular/core';
import { Medicos } from '../modelos/Medicos';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  private url="http://localhost:3001/especialidades"
  constructor(private http:HttpClient) { }


  //Retorna todas las especialidades
  getEspecialidades():Observable<any>{
      return this.http.get<any>(this.url);
  }


  //Retorna solo una especialidad segun el nombre de la especialidad
  getIdPorNombre(nombre:string):Observable<any>{
    return this.http.get<any>(`${this.url}/${nombre}`)
  }
}
