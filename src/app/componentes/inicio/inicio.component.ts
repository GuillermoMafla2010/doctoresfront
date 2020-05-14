import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  title = 'hospital';

constructor(private ls:LoginService,private router:Router){}

  ngOnInit(){
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
  });

  this.verificarAutenticacion();


  }



  verificarAutenticacion(){
    if(this.ls.isAuthenticated()==false){
        this.router.navigate(['/login'])
    }
  }

}
