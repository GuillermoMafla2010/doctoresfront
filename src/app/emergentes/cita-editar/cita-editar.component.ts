import swal from 'sweetalert2';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import { HorasService } from 'src/app/servicios/horas_service';
import { PacientesService } from 'src/app/servicios/pacientes.service';
import { MedicosService } from 'src/app/servicios/medicos.service';
import { Pacientes } from 'src/app/modelos/Pacientes';
import { Citas } from 'src/app/modelos/Citas';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CitasService} from 'src/app/servicios/citas.service';
import {Horas} from 'src/app/modelos/Horas';
import {Medicos} from 'src/app/modelos/Medicos';
import {Especialidades} from 'src/app/modelos/Especialidades';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {MatDatepickerInputEvent, MatDatepicker} from '@angular/material/datepicker';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-cita-editar',
  templateUrl: './cita-editar.component.html',
  styleUrls: ['./cita-editar.component.css'],
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
export class CitaEditarComponent implements OnInit {

  cita:Citas=new Citas

  medicos:Medicos

  medicos_recorido:Medicos

  pacientes:Pacientes

  horas=[]

  horas_laborables=[]

  especialidades:Especialidades[]=[]

  //Variable para cuando se modifique el medico sea global
  medico_id:any=0

  //Variable para cuando se modifique la fecha sea global
  fecha:any

  //Variable para que el paciente no cambie cuando se modifica el select
  paciente_id:any=0

  //variable para ver la fecha actual de la cita antes de modificarla
  hora_laborables:any

  //Variable para ver la fecha estatica original de la fecha de la cita
  fecha_original:any

  medico_reporte:any

  paciente_reporte:any

  especialidad_reporte:any

  fecha_reporte:any

  cargando:false

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private router:Router, private datePipe: DatePipe ,private cs:CitasService , public dialogRef:MatDialogRef<CitaEditarComponent> , private ms:MedicosService , private ps:PacientesService , private hs:HorasService , private es:EspecialidadesService) {}

  ngOnInit() {

    this.getCita();

  }



  //Metodo que consume el endpoint dependiendo del numero id de la cita
   getCita(){

    this.cs.getCitaPorId(this.data).subscribe(x=>{


     x.citas.map(y=>{
      this.horas_laborables.push({id:y.hora_id})
      this.medico_id=y.medico_id
      this.fecha_original=y.fecha
      const moment = _moment;
      y.fecha = moment(y.fecha);
      this.fecha=this.datePipe.transform(y.fecha,'yyyy-MM-dd')
      this.cita=y
      this.paciente_id=y.paciente_id
      this.hora_laborables=y.hora.horas_laborables
     })
      this.calcularHoras()
    })

    this.getMedicos()

    this.ps.getPacientes().subscribe(x=>this.pacientes=x.pacientes)
  }


  //Metodo que verifica las horas disponibles en un dia
  calcularHoras(){
    let horas_trabajo=[]
     this.cs.getCitaMedicoIdFecha(this.medico_id,this.fecha).subscribe(x=>{
       x.citas.map(y=>{
         horas_trabajo.push({id:y.hora_id})
       })
       this.getHoras_doctor(horas_trabajo)
     })
  }


   //Metodo que llama a todos las horas
   getHoras_doctor(hdisponibles)  {


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


    this.horas=result









    })





  }

  //Obtiene todos los medicos
  async getMedicos(){

    this.ms.getMedicos().subscribe(x=>{
      this.medicos=x.medicos;

      this.getEspecialidades()

    } )


  }

  //Obtiene todois los pacientes
  async getPacientes(){
    this.ps.getPacientes().subscribe(x=>this.pacientes=x.pacientes)
  }

  //Obtiene todas las horas
  getHoras(){
    this.hs.getHoras().subscribe(x=>this.horas=x.horas)
  }

  //Obtiene todas las especialidades

  getEspecialidades(){


    this.especialidades=[];

    this.ms.getMedicoPorId(this.medico_id).subscribe(x=>{




      //console.log(x)
    x.medicos[0].medicos_especialidades.map(y=>{
        this.es.getEspecialidadPorId(y.especialidad_id).subscribe(z=>{
         //console.log(z)
        //console.log(z.id[0].nombre_especialidad)
         this.especialidades.push(z.id[0])
          console.log(this.especialidades)
       })
     })


    });
  }


  compararmedicos(o1:any,o2:any){
    /*//console.log(o1)
    //console.log(o2)*/
    return o1===null || o2===null ? false : o1===o2;
}



compararpacientes(o1:any,o2:any){
  /*//console.log(o1)
  //console.log(o2)*/
  //VER EN LA CONSOLA PARA QUE FUNCIONE EL COMPAREWITH SI LOS ID SON IGAULES
  return o1===null || o2===null ? false : o1===o2;
}


compararespecialidad(o1:any,o2:any){
  /*//console.log(o1)
  //console.log(o2)*/
  //VER EN LA CONSOLA PARA QUE FUNCIONE EL COMPAREWITH SI LOS ID SON IGAULES
  return o1===null || o2===null ? false : o1===o2;
}


compararhora(o1:any,o2:any){
 /* //console.log(o1)
  //console.log(o2)*/
  //VER EN LA CONSOLA PARA QUE FUNCIONE EL COMPAREWITH SI LOS ID SON IGAULES
  return o1===null || o2===null ? false : o1===o2;
}

//Metodo para cerrar el modal
  salir() {
    this.dialogRef.close();
    return false;
  }

  //Metodo generico cuando un select es cambiado
  cambioselect(medico_id,fecha){

    //console.log(medico_id)
    //console.log(fecha)
    this.cs.getCitaMedicoIdFecha(medico_id,fecha).subscribe(x=>{
      x.citas.map(y=>{
        //console.log(x)
        const moment = _moment;
        y.fecha = moment(y.fecha);
        this.cita=y
        //this.paciente_id=this.cita.
      })

      this.cita.paciente_id=this.paciente_id
      this.cita.especialidad_id=undefined;
      this.cita.hora_id=undefined;
      this.getEspecialidades();
      this.calcularHoras()
    })




  }



  //Metodo cuando cambia el select de los medicos
  selectMedicos(event){

    this.medico_id=event.value
    this.cita.fecha=this.datePipe.transform(this.cita.fecha,'yyyy-MM-dd')
    this.fecha=this.cita.fecha
    this.cambioselect(this.medico_id,this.fecha)


  }

  //Metodo cuando cambia el select de los pacientes
  selectPacientes(event){
    this.paciente_id=event.value
  }



  events: string;

  //Metodo para ver el valor de la fecha cuando su valor es cambiado
  addEvent(type: string,event: MatDatepickerInputEvent<Date>) {
    this.medico_id=this.cita.medico_id
    this.fecha=this.cita.fecha
    //console.log(this.medico_id)
    this.events=(`${event.value}`);
    //console.log(this.events)

    this.events=this.datePipe.transform(this.events,'yyyy-MM-dd')
    this.fecha=this.events



    this.cambioselect(this.medico_id,this.fecha)
    this.calcularHoras()

  }





  actualizar(){
    let nombre_doctor;
    let nombre_paciente;
    let hora;
    let fecha ;
    let especialidad;

   this.ms.getMedicoPorId(this.cita.medico_id).subscribe(x=>{
      x.medicos.map(y=>{
         this.medico_reporte=y.nombre + " "+ y.apellido
      })


    })


    this.ps.getPacientesPorId(this.cita.paciente_id).subscribe(x=>{
      x.paciente.map(y=>{
        this.paciente_reporte=y.nombre + " "+ y.apellido
      })
    })

    this.es.getEspecialidadPorId(this.cita.especialidad_id).subscribe(x=>{
      x.id.map(y=>{
        this.especialidad_reporte=y.nombre_especialidad
      })
    })

    this.hs.getHorasPorId(this.cita.hora_id).subscribe(x=>{
      x.horas.map(y=>{
        this.fecha_reporte=y.horas_laborables
      })

    }
      )

    setTimeout(() => {

      swal.fire({
        title: `Seguro que quieres modificar la cita`,
        text: `HOLA`,
        html: `Doctor : ${this.medico_reporte} <br/> Paciente : ${this.paciente_reporte} <br/> Especialidad: ${this.especialidad_reporte} <br/> Fecha y Hora : ${this.fecha} - ${this.fecha_reporte}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Modificar'
      }).then((result) => {
        if (result.value) {
          this.cita.fecha=this.datePipe.transform(this.fecha,'yyyy-MM-dd')
          //console.log(this.cita)
          this.cs.updateCita(this.cita).subscribe(x=>{
            //console.log(x)
              if(x.status==200){
                this.salir();
                this.cs.notificarEditar.emit(this.cita);
              }
          })
          swal.fire(
            'Se ha modificado la cita correctamente',
            ' ',
            'success'
          )
        }
      })

    }, 500);







  }


}
