import { Injectable } from '@angular/core';
import { Medicos } from '../modelos/Medicos';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  medicos:Medicos
  private url="http://localhost:3001/medicos"
  constructor(private http:HttpClient) { }

  //Metodo para ingresar un nuevo medico
  postMedicos(medicos):Observable<any>{
    return this.http.post<any>(this.url,medicos)
  }

  //Metodo que retorna todos los medicos
  getMedicos():Observable<any>{
    return this.http.get<any>(this.url)
  }

  //Metodo para eliminar a un determinado medico
  borrarMedicos(id):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  //Metodo que retorna un medico segun su id
  getMedicoPorId(id):Observable<any>{
   return  this.http.get<any>(`${this.url}/${id}`);
  }
}
