import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Pacientes } from '../modelos/Pacientes';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  paciente:Pacientes
  private url="http://localhost:3001/pacientes"
  constructor(private http:HttpClient) { }

  //Obtiene todos los pacientes
  getPacientes():Observable<any>{
    return this.http.get<any>(this.url);
  }

  //Obtiene un paciente segun su id
  getPacientesPorId(id):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`)
  }

  postpaciente(paciente:Pacientes){
    return this.http.post<any>(this.url,paciente)
  }

}
