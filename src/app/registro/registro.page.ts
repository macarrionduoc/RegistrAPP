
import { Component, OnInit } from '@angular/core';
import { FormsModule,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {logInOutline} from 'ionicons/icons'

import { StorageService } from 'src/app/storage.service';
import { CommonModule } from '@angular/common';

interface Persona {

  nombre:string
  apellido:string
  edad:string
  rut:string
  correo:string
  carrera:any
  rol:any
  contrasena:string
  identificador:string

}


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonicModule,ReactiveFormsModule]
})
export class RegistroPage implements OnInit {

  registroForm!: FormGroup;
  
  nombre:string= ``
  apellido:string= ``
  edad:string=''
  rut:string=''
  correo:string=''
  carrera:any=``
  rol:any=''
  contrasena:string=''



// variables para leer parametros

par_username: string=""
par_password: number =0;


// Variables para  Crud

currentId: string="";  // alamacena identificador

personas:Persona[]= [];
 

  constructor(private router:Router,
              private fb:FormBuilder,
              private storageservice:StorageService                      
            
            
) {

      this.registroForm=this.fb.group({
        
        nombre: ['',[Validators.required, Validators.minLength(3)]],
        apellido: ['',[Validators.required, Validators.minLength(3)]],
        rut: ['',[Validators.required, Validators.minLength(3)]],
        edad: ['',[Validators.required, Validators.minLength(2)]],
        correo: ['',[Validators.required, Validators.minLength(3)]],
        rol: ['',[Validators.required, Validators.minLength(3)]],
        carrera: ['',[Validators.required, Validators.minLength(3)]],
        contrasena: ['',[Validators.required, Validators.minLength(3)]],
      }); 

    //inicio codigo para icono
  addIcons({'log-in-outline': logInOutline})
    //fin codigo para icono

}
// funcion para volver al login
goToLogin() {
  this.router.navigate(['/login']);

}




  async  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();

    if(navigation?.extras.queryParams){

      this.par_username=navigation.extras.queryParams['username']
      this.par_password=navigation.extras.queryParams['password']

    }

    await this.storageservice.init();
  }
  // fin ngOinit



  
  // Esperando funcionalidad del boton con el crud agregar 
  async agregar(){

    const nuevaPersona ={
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
      rut: this.rut,
      correo: this.correo,
      carrera: this.carrera,
      rol: this.rol,
      contrasena: this.contrasena,
      identificador: Date.now().toString() //genera un identificador unico
    
    }
    
    this.personas.push(nuevaPersona);

    let resp = await this.storageservice.agregar('personas', nuevaPersona)

    if (resp){
      alert('Persona Registrada')
      await this.listar()
    }else {
      alert(' No se puede registrar ')
    }


  // limpiamos los campos despues de agregar

  this.nombre="";
  this.apellido="";
  this.edad="";
  this.rut="";
  this.correo="";
  this.carrera="";
  this.rol="";
  this.contrasena="";

  } // fin de Agregar

  async listar(){




  }

} 


