import { PacientesService } from 'src/app/servicios/pacientes.service';
import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material';
import {Pacientes} from 'src/app/modelos/Pacientes';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pacientesver',
  templateUrl: './pacientesver.component.html',
  styleUrls: ['./pacientesver.component.css']
})
export class PacientesverComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public dialogRef : MatDialogRef<PacientesverComponent> , public ps : PacientesService) { }


    public loading=0

  public pacientes: Pacientes
  ngOnInit() {

    this.cargainformacion();
    
    
  }


  //metodo que retorna un usuario segun su id
  async cargainformacion(){
      await this.ps.getPacientesPorId(this.data.animal).subscribe(x=>{
        this.loading=1;
        console.log(x.paciente[0])
        this.pacientes=(x.paciente[0])
        console.log(this.pacientes)

      })
  }

  salir(){
    this.dialogRef.close();
    return false;
  }


  actualizar(){

    console.log(this.pacientes)
      this.ps.actualizapaciente(this.pacientes).subscribe(()=>{
        this.dialogRef.close();
        Swal.fire(" ","Se ha actualizado el paciente correctamente" , 'success')
        this.cargainformacion()
        this.ps.notificarEditar.emit(this.pacientes)
      })
  }
  

}
