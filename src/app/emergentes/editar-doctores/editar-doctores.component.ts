import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-editar-doctores',
  templateUrl: './editar-doctores.component.html',
  styleUrls: ['./editar-doctores.component.css']
})
export class EditarDoctoresComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , public dialogRef : MatDialogRef<EditarDoctoresComponent>) { }

  ngOnInit() {
console.log(this.data.id)
  }

}
