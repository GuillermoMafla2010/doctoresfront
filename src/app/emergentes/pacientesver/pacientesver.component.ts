import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-pacientesver',
  templateUrl: './pacientesver.component.html',
  styleUrls: ['./pacientesver.component.css']
})
export class PacientesverComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
