import  swal from 'sweetalert2';
import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material';
import { Especialidades } from 'src/app/modelos/Especialidades';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-editar-especialidad',
  templateUrl: './editar-especialidad.component.html',
  styleUrls: ['./editar-especialidad.component.css']
})
export class EditarEspecialidadComponent implements OnInit {

  public especialidad:Especialidades;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public dialogRef : MatDialogRef<EditarEspecialidadComponent> , public es : EspecialidadesService , private router:Router) { }

  ngOnInit() {

    setTimeout(() => {
      this.cargainformacion()
    }, 100);



  }

   //metodo que retorna un usuario segun su id
   async cargainformacion(){
    /*await this.es.getPacientesPorId(this.data.animal).subscribe(x=>{
      this.loading=1;
      console.log(x.paciente[0])
      this.pacientes=(x.paciente[0])
      console.log(this.pacientes)

    })*/
    await this.es.getEspecialidadPorId(this.data.id).subscribe(x=>{
      x.id.map(y=>{
        console.log(y.nombre_especialidad)
        this.especialidad=y
      })
    })
   //console.log(this.data.id)
}


actualizaEspecialidad(){
  this.es.actualizaEspecialidad(this.especialidad).subscribe(x=>{
      swal.fire('Actualizado','Se actualizo correctamente la especialidad','success');
      this.router.navigate(['/especialidades'])
      this.dialogRef.close();
      this.es.notificarUpload.emit(this.especialidad)

  })
}

}
