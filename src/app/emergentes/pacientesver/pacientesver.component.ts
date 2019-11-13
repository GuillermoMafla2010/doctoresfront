import { PacientesService } from 'src/app/servicios/pacientes.service';
import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material';
import {Pacientes} from 'src/app/modelos/Pacientes';


@Component({
  selector: 'app-pacientesver',
  templateUrl: './pacientesver.component.html',
  styleUrls: ['./pacientesver.component.css']
})
export class PacientesverComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public dialogRef : MatDialogRef<PacientesverComponent> , public ps : PacientesService) { }



  public pacientes: Pacientes[]=[];
  ngOnInit() {
    this.cargainformacion()
    console.log("Variable de paciente" + this.data.animal)
  }


  //metodo que retorna un usuario segun su id
  cargainformacion(){
      this.ps.getPacientesPorId(this.data.animal).subscribe(x=>{
        console.log(x.paciente[0])
        this.pacientes.push(x.paciente[0])
        console.log(this.pacientes)

      })
  }

}
