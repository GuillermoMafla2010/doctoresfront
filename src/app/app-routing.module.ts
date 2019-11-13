import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicosComponent } from './componentes/medicos/medicos.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { CrearPacientesComponent } from './componentes/pacientes/crear-pacientes/crear-pacientes.component';



const routes: Routes = [
  {path:'pacientes' , component:PacientesComponent},
  {path:'medicos' , component:MedicosComponent},
  {path:'nuevopaciente' , component:CrearPacientesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
