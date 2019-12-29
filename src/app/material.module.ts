import { EditarDoctoresComponent } from './emergentes/editar-doctores/editar-doctores.component';
import { PacientesverComponent } from './emergentes/pacientesver/pacientesver.component';

import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { EditarEspecialidadComponent } from './emergentes/editar-especialidad/editar-especialidad.component';


@NgModule({

    imports: [
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatAutocompleteModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatSelectModule,
        MatAutocompleteModule
    ],
    entryComponents: [
      PacientesverComponent,
      EditarEspecialidadComponent,
      EditarDoctoresComponent
    ]
  })
  export class MaterialModule { }
