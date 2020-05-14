import { PacientesService } from 'src/app/servicios/pacientes.service';
import { CitasService } from './../../servicios/citas.service';
import {FormControl} from '@angular/forms';
import { EspecialidadesService } from './../../servicios/especialidades.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Especialidades } from 'src/app/modelos/Especialidades';

import { Observable } from 'rxjs';
import { MedicosService } from 'src/app/servicios/medicos.service';
import { Medicos } from 'src/app/modelos/Medicos';
import {map, startWith, flatMap} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepickerInputEvent, MatDatepicker} from '@angular/material/datepicker';
import {Horas} from 'src/app/modelos/Horas';
import {HorasService} from 'src/app/servicios/horas_service';
import {Moment} from 'moment';
import {Citas} from 'src/app/modelos/Citas';
import {DatePipe} from '@angular/common';
import {Pacientes} from 'src/app/modelos/Pacientes';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class CitasComponent implements OnInit {

  lista:Medicos[]=[];
  listaPacientes:Pacientes[]=[];

  //Se rellena dependiendo de la especialidad del medico
  private especialidades:Especialidades[]=[];

  //Se rellena dependiendo de las horas encontradas
  private horas:Horas[]=[];

  //Guarda el id del medico cuando cambia el autocomplete
  private medico_id:number;

  autocomplete = new FormControl();
  options: Observable<Medicos[]>

  autocompletePacientes = new FormControl();
  optionsPacientes: Observable<Pacientes[]>


  //Para interactuar con un elemento HTML
  @ViewChild(MatDatepicker,{static: false})
  dp3:MatDatepicker<Moment>;

  @ViewChild('doctorname',{static: false}) redel:ElementRef


  //Instancia de CitasModel que guardara una cita en la base
  public cita:Citas=new Citas;

  constructor(public ps:PacientesService, public ms:MedicosService, public es:EspecialidadesService , public hs:HorasService , public cs:CitasService , private datePipe: DatePipe) { }

  ngOnInit() {
    this.getRegistros()
    this.getPacientes()




    this.options = this.autocomplete.valueChanges
      .pipe(

        map(value => typeof value === 'string' ? value : value.nombre),
        map(name => name ? this._filter(name) : this.lista.slice())
      );


      this.optionsPacientes = this.autocompletePacientes.valueChanges
      .pipe(

        map(value => typeof value === 'string' ? value : value.nombre),
        map(name => name ? this._filterPacientes(name) : this.listaPacientes.slice())
      );


  }

  getRegistros(){
    this.ms.getMedicos().subscribe(x=>{
      this.lista=x.medicos
      //console.log(this.lista)
    })
  }

  getPacientes(){
    this.ps.getPacientes().subscribe(x=>{
      this.listaPacientes=x.pacientes

    })
  }


  displayFn(medicos?: Medicos): string | undefined {
    return medicos ? medicos.nombre + ' '+ medicos.apellido : undefined;
  }

  displayFnPacientes(pacientes?: Pacientes): string | undefined {
    return pacientes ? pacientes.nombre + ' '+ pacientes.apellido : undefined;
  }

  private _filter(name: string): Medicos[] {
    const filterValue = name.toLowerCase();

   // return this.listaproducto.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
   return this.lista.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterPacientes(name: string): Pacientes[] {
    const filterValue = name.toLowerCase();

   // return this.listaproducto.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
   return this.listaPacientes.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }


  seleccionarProducto(event:MatAutocompleteSelectedEvent){

    let producto=event.option.value
    this.obtenerEspecialidades(producto.id)

    this.medico_id=producto.id

    this.dp3.select(undefined);
    this.horas=[]
  }



  seleccionarPaciente(event:MatAutocompleteSelectedEvent){




  }






  //Metodo para mostrar en pantalla las especialidades de un medico seleccionado
  obtenerEspecialidades(id)  {
    this.especialidades=[];
    this.ms.getMedicoPorId(id).subscribe(x=>{
     x.medicos[0].medicos_especialidades.map(y=>{
       this.es.getEspecialidadPorId(y.especialidad_id).subscribe(z=>{
         //console.log(z)
        //console.log(z.id[0].nombre_especialidad)
         this.especialidades.push(z.id[0])

          /*this.especialidades.map(a=>{
            if(a==z.id[0].nombre_especialidad){
              return false;
            }
          })*/

          //console.log(this.especialidades)
       })
     })


    });
  }


  events: string;

  //Metodo para ver el valor de la fecha cuando su valor es cambiado
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events=(`${event.value}`);

    this.events=this.datePipe.transform(this.events,'yyyy-MM-dd')
    //console.log(this.events)
    //this.cita.fecha=`${event.value}`;


      this.cs.getCitaMedicoIdFecha(this.medico_id,this.events).subscribe(x=>{
        //console.log(x)
        let horas=[];
        x.citas.map(y=>{
          //console.log(y.fecha,y.hora_id)
          horas.push({id:y.hora_id})
        })
        this.getHoras(horas);


      })



  }



  //Metodo que llama a todos las horas
   getHoras(hdisponibles)  {
    let bandera=false;
    let horas_disponibles=[]
    let horas_total=[];
    let resultado

    this.hs.getHoras().subscribe(x=>{




       var uniqueResultOne = x.horas.filter(function(obj) {
        return !hdisponibles.some(function(obj2) {
            return obj.id == obj2.id;
        });
    });

    //Find values that are in result2 but not in result1
    var uniqueResultTwo = hdisponibles.filter(function(obj) {
        return !x.horas.some(function(obj2) {
            return obj.id == obj2.id;
        });
    });

    //Combine the two arrays of unique entries
    var result = uniqueResultOne.concat(uniqueResultTwo);
    //console.log(result);
    this.horas=result








    })





  }



  guardarcita(){



    this.cita.medico_id;
    this.events=this.datePipe.transform(this.events,'yyyy-MM-dd')
    this.cita.fecha=this.events
    this.cs.postCita(this.cita).subscribe(x=>{
      //console.log(x);
    })


  }

}
