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
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MedicosComponent,
    PacientesComponent,
    PacientesverComponent,
    CrearPacientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
