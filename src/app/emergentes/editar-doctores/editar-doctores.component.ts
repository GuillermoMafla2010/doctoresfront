import { MedicosService } from './../../servicios/medicos.service';
import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material';
import { Medicos } from 'src/app/modelos/Medicos';
import { MedicosEspecialidadesService } from 'src/app/servicios/medicos-especialidades.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import { Especialidades } from 'src/app/modelos/Especialidades';
import { FormControl } from '@angular/forms';
import { Medicos_Especialidades } from 'src/app/modelos/Medicos_Especialidades';
import swal from 'sweetalert2'


@Component({
  selector: 'app-editar-doctores',
  templateUrl: './editar-doctores.component.html',
  styleUrls: ['./editar-doctores.component.css']
})
export class EditarDoctoresComponent implements OnInit {

  public medicos_especialidades:Medicos_Especialidades= new Medicos_Especialidades;
  public medicos:Medicos
  public especialidades:Especialidades[]=[]
  public spec_escogida:any=[];
  public spec_filtrada:any=[];
  public especialidades_id:number[]=[]
  
  toppings = new FormControl();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public dialogRef : MatDialogRef<EditarDoctoresComponent> , public ms:MedicosService , public mes:MedicosEspecialidadesService , public es:EspecialidadesService) { }

  ngOnInit() {
    this.getEspecialidades();
    this.getDoctores();  
  }


  getEspecialidades(){
    this.es.getEspecialidades().subscribe(x=>{
      //console.log(x.spec)
      this.especialidades=x.spec
     
    })
  }

  


   getDoctores(){
   
   this.ms.getMedicoPorId(this.data).subscribe(x=>{
      x.medicos.map(y=>{
        this.medicos=y
    })

    this.medicos.medicos_especialidades.map(z=>{

        this.spec_escogida.push(z.Especialidades)

    })

    
      this.filtrarEspecialidades()

    })
  }


  filtrarEspecialidades(){
    
      //CODIGO NECESARIO PARA FILTRAR SEGUN
      let yFilter=this.spec_escogida.map(itemY=>{return itemY.id;});

      this.spec_filtrada=this.especialidades.filter(itemX=>!yFilter.includes(itemX.id))

      
      if(this.spec_filtrada.length==0){
        this.spec_filtrada=this.especialidades
      }
  }
  

  borrarEspecialidad(id){
    this.mes.borrar_medico_especialidad(id).subscribe(spec=>{
      this.spec_escogida=[]
      this.getDoctores()
      
  })
}


  salir(){
    this.dialogRef.close();
    return false;
  }




  onChange(event){
    
    event.map(x=>{
      this.especialidades_id=[]
      this.es.getIdPorNombre(x).subscribe(y=>{
        
        this.especialidades_id.push(y.id[0].id)
        
      })
    })

    
  }


  actualizarDoctor(){
    this.ms.updateMedico(this.medicos).subscribe(x=>{
      //swal.fire('Actualizado','Se ha actualizado correctamente el médico','success')
      //this.salir()
      this.ms.notificarEditar.emit(this.medicos);
      this.especialidades_id.map(y=>{
        this.medicos_especialidades.medico_id=this.medicos.id
        this.medicos_especialidades.especialidad_id=y
        this.mes.guardar_medico_especialidad(this.medicos_especialidades).subscribe(z=>{
          
        })
      })
    })
  }


  funcion(){
    console.log(this.especialidades);
    console.log(this.spec_escogida);
    console.log(this.spec_filtrada)
  }

  

}
