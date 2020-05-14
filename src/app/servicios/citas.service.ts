import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
import {Citas} from '../modelos/Citas';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private _notificarEditar=new EventEmitter<any>();
  private _notificarEliminar=new EventEmitter<any>();
  //private cita:Citas;
  constructor(private http:HttpClient) { }


  get notificarEditar():EventEmitter<any>{
    return this._notificarEditar;
  }

  get notificarEliminar():EventEmitter<any>{
    return this._notificarEliminar;
  }

  private url='http://localhost:3001/citas'
  private url2='http://localhost:3001/citas_editar'


 //Metodo que obtiene las citas de un doctor en determinado dia
  getCitaMedicoIdFecha(id:number,fecha:string):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}/${fecha}`);
  }

  getCitaMedicoIdFecha_editar(id:number,fecha:string):Observable<any>{
    return this.http.get<any>(`${this.url2}/${id}/${fecha}`);
  }

  //Metodo que elimina una cita
  eliminarCita(id):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }


  //Metodo que guarda una cita en el sistema
  postCita(cita:Citas):Observable<any>{

    return this.http.post<any>(this.url,cita);
  }


  //Obtener una cita segun el id de la cita
  getCitaPorId(id):Observable<any>{

    return this.http.get<any>(`${this.url}/${id}`);
  }

  //Actualizar una cita segun el id de la cita
  updateCita(cita):Observable<any>{
    return this.http.put<any>(`${this.url}/${cita.id}`,cita)
  }
}
