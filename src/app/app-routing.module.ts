import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicosComponent } from './componentes/medicos/medicos.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';

MedicosComponent


const routes: Routes = [
  {path:'pacientes' , component:PacientesComponent},
  {path:'medicos' , component:MedicosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
