import { Injectable , EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Pacientes } from '../modelos/Pacientes';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  paciente:Pacientes
  private url="http://localhost:3001/pacientes";
  private _notificarEditar=new EventEmitter<any>();


  constructor(private http:HttpClient) { }


  get notificarEditar():EventEmitter<any>{
    return this._notificarEditar;
  }

  //Obtiene todos los pacientes
  getPacientes():Observable<any>{
    return this.http.get<any>(this.url);
  }

  //Obtiene un paciente segun su id
  getPacientesPorId(id):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`)
  }

  //inserta un nuevo paciente
  postpaciente(paciente:Pacientes):Observable<any>{
    return this.http.post<any>(this.url,paciente)
  }

  //elimina a un paciente
  deletepaciente(id){
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  //actualiza a un paciente
  actualizapaciente(paciente){
    return this.http.put<any>(`${this.url}/${paciente.id}` , paciente);
  }

}
