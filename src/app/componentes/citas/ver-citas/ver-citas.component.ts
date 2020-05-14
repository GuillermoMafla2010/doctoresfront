import { CitaEditarComponent } from './../../../emergentes/cita-editar/cita-editar.component';
import { MedicosService } from 'src/app/servicios/medicos.service';
import { Component, OnInit, ViewChild , AfterViewInit } from '@angular/core';
import {CitasService} from 'src/app/servicios/citas.service';
import {Medicos} from 'src/app/modelos/Medicos';
import {Citas} from 'src/app/modelos/Citas';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS} from '@angular/material-moment-adapter';
import {DatePipe} from '@angular/common';
import {MatPaginator, MatTableDataSource,MatSort} from '@angular/material';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import swal from 'sweetalert2'

@Component({
  selector: 'app-ver-citas',
  templateUrl: './ver-citas.component.html',
  styleUrls: ['./ver-citas.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class VerCitasComponent implements OnInit,AfterViewInit {

  lista_medicos:Medicos[]=[];

  lista_citas:Citas[]=[];

  events:string;

  cita:Citas;

  medico_id:number;

  displayedColumns: string[] = ['ID', 'Nombre', 'Apellido', 'Email','Celular','Especialidad','Hora','Opciones'];
  dataSource : any;






  constructor(private ms:MedicosService, private cs:CitasService,private datePipe: DatePipe,public dialog: MatDialog) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.paginator=this.paginator;
    this.getMedicos();
    this.cs.notificarEditar.subscribe(x=>{
      this.consultarcita()
    })

    this.cs.notificarEliminar.subscribe(x=>{
      this.consultarcita()
    })
  }


  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getMedicos(){
    this.ms.getMedicos().subscribe(x=>{
      this.lista_medicos=x.medicos

      //console.log(this.lista_medicos)
    })
  }



  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events=(`${event.value}`);
    this.events=this.datePipe.transform(this.events,'yyyy-MM-dd')
    //console.log(this.events)

  }



  consultarcita(){

    this.cs.getCitaMedicoIdFecha(this.medico_id,this.events).subscribe(x=>{
      this.lista_citas=x.citas
      this.dataSource.data=x.citas
      //console.log(this.lista_citas)
    })

  }


  edit(id){

    this.dialog.open(CitaEditarComponent,{
      data:id
    })

  }

  borrar(id){
    swal.fire({
      title: 'Estas seguro que eliminaras la cita?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.cs.eliminarCita(id).subscribe(x=>{
          this.cs.notificarEliminar.emit(this.cita);
        })
        swal.fire(
          'Eliminado',
          'Se ha logrado eliminar la cita',
          'success'
        )
      }
    })

  }


}
