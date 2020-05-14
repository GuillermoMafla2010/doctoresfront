import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicos_Especialidades } from '../modelos/Medicos_Especialidades';

@Injectable({
  providedIn: 'root'
})
export class MedicosEspecialidadesService {


  public medicos_especialides:Medicos_Especialidades;
  private url="http://localhost:3001/medicos_especialidad";
  constructor(private http:HttpClient) { }


  guardar_medico_especialidad(id:Medicos_Especialidades):Observable<any>{
    ////console.log(id)
    return this.http.post<any>(this.url,id);
  }

  borrar_medico_especialidad(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }
}
