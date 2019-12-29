import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicosComponent } from './componentes/medicos/medicos.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PacientesverComponent } from './emergentes/pacientesver/pacientesver.component';
import { CrearPacientesComponent } from './componentes/pacientes/crear-pacientes/crear-pacientes.component';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CrearMedicosComponent } from './componentes/medicos/crear-medicos/crear-medicos.component';
import { EspecialidadesComponent } from './componentes/especialidades/especialidades.component';
import { CitasComponent } from './componentes/citas/citas.component';
import { EditarEspecialidadComponent } from './emergentes/editar-especialidad/editar-especialidad.component';
import { EditarDoctoresComponent } from './emergentes/editar-doctores/editar-doctores.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    PacientesComponent,
    PacientesverComponent,
    CrearPacientesComponent,
    CrearMedicosComponent,
    EspecialidadesComponent,
    CitasComponent,
    EditarEspecialidadComponent,
    EditarDoctoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
