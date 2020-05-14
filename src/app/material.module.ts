import { CitaEditarComponent } from './emergentes/cita-editar/cita-editar.component';
import { EditarDoctoresComponent } from './emergentes/editar-doctores/editar-doctores.component';
import { PacientesverComponent } from './emergentes/pacientesver/pacientesver.component';
import es from '@angular/common/locales/es';
    import { registerLocaleData } from '@angular/common';

    registerLocaleData(es);

import { NgModule,LOCALE_ID } from '@angular/core';
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
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCardModule} from '@angular/material/card';

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
        MatAutocompleteModule,
        MatBadgeModule,
        MatListModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatCardModule

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
        MatAutocompleteModule,
        MatBadgeModule,
        MatListModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatCardModule
    ],
    entryComponents: [
      PacientesverComponent,
      EditarEspecialidadComponent,
      EditarDoctoresComponent,
      CitaEditarComponent
    ],

    providers: [ MatDatepickerModule, { provide: LOCALE_ID, useValue: "es-*" } ],
  })
  export class MaterialModule { }
