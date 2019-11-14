import { Component, OnInit } from '@angular/core';
import { Medicos } from 'src/app/modelos/Medicos';
import { MedicosService } from 'src/app/servicios/medicos.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-medicos',
  templateUrl: './crear-medicos.component.html',
  styleUrls: ['./crear-medicos.component.css']
})
export class CrearMedicosComponent implements OnInit {

  public medicos:Medicos = new Medicos
  constructor(private ms : MedicosService , private router: Router) { }




  ngOnInit() {
  }


  guardarmedicos(){
    this.ms.postMedicos(this.medicos).subscribe(x=>{
      swal.fire('Nuevo medico creado',`${x.nombre} , ${x.apellido}`,'success');
      this.router.navigate(['/medicos'])
    })
  }

}
