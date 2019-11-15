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
}
