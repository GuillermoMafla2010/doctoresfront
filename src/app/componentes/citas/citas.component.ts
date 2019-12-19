import { Component, OnInit } from '@angular/core';
import { Especialidades } from 'src/app/modelos/Especialidades';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import { MedicosService } from 'src/app/servicios/medicos.service';
import { Medicos } from 'src/app/modelos/Medicos';
import {map, startWith, flatMap} from 'rxjs/operators';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  lista:Medicos[]=[];
  autocomplete = new FormControl();
  options: Observable<Medicos[]>

  constructor(public ms:MedicosService) { }

  ngOnInit() {
    this.getRegistros()
    this.options = this.autocomplete.valueChanges
      .pipe(

        map(value => typeof value === 'string' ? value : value.nombre),
        map(name => name ? this._filter(name) : this.lista.slice())
      );
  }

  getRegistros(){
    this.ms.getMedicos().subscribe(x=>{
      this.lista=x.medicos
      
    })
  }



  displayFn(medicos?: Medicos): string | undefined {
    return medicos ? medicos.nombre + ' '+ medicos.apellido : undefined;
  }

  private _filter(name: string): Medicos[] {
    const filterValue = name.toLowerCase();
  
   // return this.listaproducto.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
   return this.lista.filter(option => option.nombre.toLowerCase().indexOf(filterValue) === 0);
  }


  seleccionarProducto(event:MatAutocompleteSelectedEvent){
    let producto=event.option.value
    console.log(producto)
  }

}
