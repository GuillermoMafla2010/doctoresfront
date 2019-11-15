import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { MedicosService } from 'src/app/servicios/medicos.service';
import { Medicos } from 'src/app/modelos/Medicos';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  public medicos:Medicos[]=[]
  displayedColumns: string[] = ['ID', 'Nombre', 'Apellido', 'Email','Celular','Opciones'];
  dataSource : any;

  
  constructor(private ms:MedicosService) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource=new MatTableDataSource();
    this.dataSource.paginator=this.paginator;
    this.getMedicos()
  }

  //Retorna todos los medicos
  getMedicos(){
    this.ms.getMedicos().subscribe(x=>{
      this.medicos=x.medicos
      this.dataSource.data=this.medicos
      console.log(this.medicos)
    })
  }

}
