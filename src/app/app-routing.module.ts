import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { VerCitasComponent } from './componentes/citas/ver-citas/ver-citas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicosComponent } from './componentes/medicos/medicos.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { CrearPacientesComponent } from './componentes/pacientes/crear-pacientes/crear-pacientes.component';
import { CrearMedicosComponent } from './componentes/medicos/crear-medicos/crear-medicos.component';
import { EspecialidadesComponent } from './componentes/especialidades/especialidades.component';
import { CitasComponent } from './componentes/citas/citas.component';



const routes: Routes = [


  {path:'login',component:LoginComponent},
  {path:'inicio',component:InicioComponent,children:[
      {path:'pacientes' , component:PacientesComponent},
      {path:'medicos' , component:MedicosComponent},
      {path:'nuevopaciente' , component:CrearPacientesComponent},
      {path:'nuevomedico' ,component:CrearMedicosComponent},
      {path:'especialidades',component:EspecialidadesComponent},
      {path:'citas' , component:CitasComponent},
      {path:'ver_citas',component:VerCitasComponent},
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
