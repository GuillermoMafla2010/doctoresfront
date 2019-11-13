import { Component, OnInit } from '@angular/core';
import { Pacientes } from 'src/app/modelos/Pacientes';
import { PacientesService } from 'src/app/servicios/pacientes.service';

@Component({
  selector: 'app-crear-pacientes',
  templateUrl: './crear-pacientes.component.html',
  styleUrls: ['./crear-pacientes.component.css']
})
export class CrearPacientesComponent implements OnInit {

  public paciente:Pacientes = new Pacientes;
  constructor(public ps:PacientesService) { }

  ngOnInit() {
  }

  guardapaciente(){
    this.ps.postpaciente(this.paciente).subscribe(x=>{
      console.log(x)
    })
  }

}
