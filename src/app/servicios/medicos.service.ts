import { Injectable ,EventEmitter} from '@angular/core';
import { Medicos } from '../modelos/Medicos';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  medicos:Medicos
  private url="http://localhost:3001/medicos"
  private _notificarEditar=new EventEmitter<any>();
  constructor(private http:HttpClient) { }

  get notificarEditar():EventEmitter<any>{
    return this._notificarEditar;
  }

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


  //Metodo para actualizar a un medico
  updateMedico(medicos):Observable<any>{
    return this.http.put<any>(`${this.url}/${medicos.id}`,medicos)
  }
}
