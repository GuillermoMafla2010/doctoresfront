import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Pacientes } from '../modelos/Pacientes';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private url="http://localhost:3001/pacientes"
  constructor(private http:HttpClient) { }

  getPacientes():Observable<any>{
    return this.http.get<any>(this.url);
  }

  getPacientesPorId(id):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`)
  }
}
