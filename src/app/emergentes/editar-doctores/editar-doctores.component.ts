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
   
    this.getEspecialidades()
    this.getDoctores();
    

    
  }


  getEspecialidades(){

    
    this.es.getEspecialidades().subscribe(x=>{
      console.log(x.spec)
      this.especialidades=x.spec

     
    
     
    })

  

    
   

  }

  actualizarDoctor(){
    this.ms.updateMedico(this.medicos).subscribe(x=>{
      this.salir()
      this.ms.notificarEditar.emit(this.medicos);
      this.especialidades_id.map(y=>{
        this.medicos_especialidades.medico_id=this.medicos.id
        this.medicos_especialidades.especialidad_id=y
        this.mes.guardar_medico_especialidad(this.medicos_especialidades).subscribe(z=>{
          console.log(z)
        })
      })
    })
  }


  async getDoctores(){
    await this.ms.getMedicoPorId(this.data).subscribe(x=>{
      x.medicos.map(y=>{
        this.medicos=y
       

        console.log(this.medicos.medicos_especialidades)

        

      })

      this.medicos.medicos_especialidades.map(z=>{
       
        this.spec_escogida.push(z.Especialidades)
        console.log(this.spec_escogida);
        
      })

      

      //CODIGO NECESARIO PARA FILTRAR SEGUN
      let yFilter=this.spec_escogida.map(itemY=>{return itemY.id;});

      this.spec_filtrada=this.especialidades.filter(itemX=>!yFilter.includes(itemX.id))

      console.log(this.spec_filtrada)

      if(this.spec_filtrada.length==0){
        this.spec_filtrada=this.especialidades
      }
    })
  }

  

  borrarEspecialidad(id){
    this.mes.borrar_medico_especialidad(id).subscribe(x=>{
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
        console.log(this.especialidades_id);
      })
    })

    
  }

  

}
