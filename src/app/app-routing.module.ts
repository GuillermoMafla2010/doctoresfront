import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicosComponent } from './componentes/medicos/medicos.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { CrearPacientesComponent } from './componentes/pacientes/crear-pacientes/crear-pacientes.component';
import { CrearMedicosComponent } from './componentes/medicos/crear-medicos/crear-medicos.component';



const routes: Routes = [
  {path:'pacientes' , component:PacientesComponent},
  {path:'medicos' , component:MedicosComponent},
  {path:'nuevopaciente' , component:CrearPacientesComponent},
  {path:'nuevomedico' ,component:CrearMedicosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
