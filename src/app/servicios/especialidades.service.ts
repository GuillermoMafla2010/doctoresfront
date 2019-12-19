import { Injectable } from '@angular/core';
import { Medicos } from '../modelos/Medicos';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidades } from '../modelos/Especialidades';


@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  public especialidades:Especialidades;
  private url="http://localhost:3001/especialidades"
  private url1="http://localhost:3001/especialidad"
  constructor(private http:HttpClient) { }


  //Retorna todas las especialidades
  getEspecialidades():Observable<any>{
      return this.http.get<any>(this.url);
  }


  //Retorna solo una especialidad segun el nombre de la especialidad
  getIdPorNombre(nombre:string):Observable<any>{
    return this.http.get<any>(`${this.url}/${nombre}`)
  }

  //Guarda una nueva especialidad
  postEspecialidad(especialidades):Observable<any>{
    return this.http.post<any>(this.url,especialidades);
  }


  //Elimina una especialidad
  borrarEspecialidad(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  //Obtiene una especialidad segun su id
  getEspecialidadPorId(id:number):Observable<any>{
    return this.http.get<any>(`${this.url1}/${id}`)
  }
}
