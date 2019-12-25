import { Component, OnInit,ViewChild } from '@angular/core';
import { Especialidades } from 'src/app/modelos/Especialidades';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import swal from 'sweetalert2';
import { EditarEspecialidadComponent } from 'src/app/emergentes/editar-especialidad/editar-especialidad.component';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name' , 'options'];
  
  public especialidades:Especialidades
  public especialidad:Especialidades=new Especialidades;
  public dataSource:any
  constructor(private es:EspecialidadesService , public dialog:MatDialog){}
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(){
    this.dataSource=new MatTableDataSource();
    this.getEspecialidades()
    this.dataSource.paginator=this.paginator;

    //Notificar upload desde la ventana modal
    this.es.notificarUpload.subscribe(x=>{
      this.getEspecialidades()
    })
  }

  getEspecialidades(){
    this.es.getEspecialidades().subscribe(x=>{
      this.especialidades=x.spec
      this.dataSource.data=this.especialidades
      console.log(this.dataSource)
      
    })
  }



  guardarEspecialidad(){
    
    this.es.postEspecialidad(this.especialidad).subscribe(y=>{
      swal.fire('Guardado','Especialidad creada con exito','success')
      this.getEspecialidades();
    });
  }



  borrar(id){
    this.es.borrarEspecialidad(id).subscribe(y=>{
      swal.fire({
      title: 'Estas seguro de eliminar el registro',
      text: "Se borrará permanentemente el registro",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.es.borrarEspecialidad(id).subscribe(z=>{
          this.getEspecialidades()
        })
        swal.fire(
          'Eliminado',
          'Se elimino correctamente',
          'success'
        )
      }
    })
    })
  }



  edit(id){
    this.dialog.open(EditarEspecialidadComponent,{data:{
      id}
    })
  }



}
