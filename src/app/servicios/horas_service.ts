import { Injectable , EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Horas} from '../modelos/Horas';



@Injectable({
  providedIn: 'root'
})
export class HorasService {


  constructor(
    private http:HttpClient
  ){}

  private url= 'http://localhost:3001/horas'
  private horas:Horas;


  //Obtiene todas las horas del bakcend
  getHoras():Observable<any>{
    return this.http.get<any>(this.url);
  }

  //Meitodo para obtener una hora segun su id
  getHorasPorId(id):Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`)
  }


}
