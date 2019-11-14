import { Component, OnInit } from '@angular/core';
import { Pacientes } from 'src/app/modelos/Pacientes';
import { PacientesService } from 'src/app/servicios/pacientes.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-crear-pacientes',
  templateUrl: './crear-pacientes.component.html',
  styleUrls: ['./crear-pacientes.component.css']
})
export class CrearPacientesComponent implements OnInit {

  private paciente:Pacientes = new Pacientes;
  constructor(public ps:PacientesService , private router : Router) { }

  ngOnInit() {
  }

  guardapaciente(){
    console.log(this.paciente)
    this.ps.postpaciente(this.paciente).subscribe(x=>{
      swal.fire('Nuevo Paciente Creado', `${x.paciente.nombre} ${x.paciente.apellido}` , 'success')
      this.router.navigate(['/pacientes']);
    })
  }

}
