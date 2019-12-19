import { Component, OnInit } from '@angular/core';
import { Medicos } from 'src/app/modelos/Medicos';
import { MedicosService } from 'src/app/servicios/medicos.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import {FormControl} from '@angular/forms';
import { MedicosEspecialidadesService } from 'src/app/servicios/medicos-especialidades.service';
import { Medicos_Especialidades } from 'src/app/modelos/Medicos_Especialidades';



@Component({
  selector: 'app-crear-medicos',
  templateUrl: './crear-medicos.component.html',
  styleUrls: ['./crear-medicos.component.css']
})
export class CrearMedicosComponent implements OnInit {

  public medicos:Medicos = new Medicos
  public medicos_especialidades:Medicos_Especialidades= new Medicos_Especialidades;
  public especialidades:string[]=[]
  public especialidades_id:number[]=[];
  public especialidades_id_nuevo:number[]=[];
  toppings = new FormControl();
  constructor(private ms : MedicosService , private router: Router , private es:EspecialidadesService , private mes:MedicosEspecialidadesService) { }




  ngOnInit() {
    this.getEspecialidades();
    console.log(this.toppings)
    
  }


  guardarmedicos(){

    
    
    this.ms.postMedicos(this.medicos).subscribe(x=>{
      swal.fire('Nuevo medico creado',`${x.medicos.nombre} , ${x.medicos.apellido}`,'success');
      this.especialidades_id.map(y=>{
        this.medicos_especialidades.medico_id=x.medicos.id
        this.medicos_especialidades.especialidad_id=y
        this.mes.guardar_medico_especialidad(this.medicos_especialidades).subscribe(z=>{
          console.log(z)
        })
      })
      this.router.navigate(['/medicos']);
    })

    /*for(var i=0 ; i<this.especialidades_id.length ; i++){
      
      console.log(this.especialidades_id.length)
      this.medicos_especialidades.medico_id=this.medicos.id
      this.medicos_especialidades.especialidad_id=this.especialidades_id[i];
      
    }*/

    
  }


  getEspecialidades(){
    this.es.getEspecialidades().subscribe(x=>{
        
        this.especialidades=x.spec
        console.log(this.especialidades)
    })
  }

  onChange(event){
    
    console.log(event)

    /*(if(event.length > 1){
      event=event[0]
    }*/
      

    event.map(x=>{
      this.especialidades_id=[]
      this.es.getIdPorNombre(x).subscribe(y=>{
        
        this.especialidades_id.push(y.id[0].id)
        console.log(this.especialidades_id);
      })
    })

     /* this.es.getIdPorNombre(event).subscribe(x=>{
       
        
        console.log(x)
        //this.especialidades_id.push(x.id[0].id);
        //console.log(this.especialidades_id)
        
        
      });*/
    


    
  }

}
