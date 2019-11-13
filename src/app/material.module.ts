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
        MatSelectModule
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
        MatSelectModule
    ],
    entryComponents: [
      PacientesverComponent
    ]
  })
  export class MaterialModule { }
