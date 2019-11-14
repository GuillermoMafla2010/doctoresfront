import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { PacientesService } from 'src/app/servicios/pacientes.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Pacientes } from 'src/app/modelos/Pacientes';
import { PacientesverComponent } from 'src/app/emergentes/pacientesver/pacientesver.component';
import swal from 'sweetalert2'

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  public pacientes:Pacientes[];
  displayedColumns: string[] = ['ID', 'Nombre', 'Apellido', 'Email','Celular','Opciones'];
  dataSource : any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private pacienteservice:PacientesService,public dialog: MatDialog ) { }

  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.paginator=this.paginator;
    this.getpacientes()
  }

  getpacientes(){
    this.pacienteservice.getPacientes().subscribe(x=>{
      this.pacientes=x.pacientes;
      this.dataSource.data=this.pacientes
      console.log(this.dataSource)
    })
  }

  edit(id) {
    console.log(id);
    this.dialog.open(PacientesverComponent, {
      data: {
        animal: id
      }
    });
  }

  borrar(id) {

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
        this.pacienteservice.deletepaciente(id).subscribe(x=>{
          
          this.getpacientes()
        })
        swal.fire(
          'Eliminado',
          'Se elimino correctamente',
          'success'
        )
      }
    })




    

  }

   openDialog() {

  }

}
