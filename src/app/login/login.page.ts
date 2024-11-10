import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormGroup,ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule,AnimationController,Animation } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

import {UserService} from 'src/app/user.service';// ajusta ruta segun direccion del archivo



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,FormsModule,ReactiveFormsModule]
})


export class LoginPage  {
   loginForm!: FormGroup;

  // usuario:string="estudiante"
  // password:string="1234"

  
    

// Variables para leer parametros
  @ViewChild('logo', {read:ElementRef}) logo?:ElementRef<HTMLImageElement>;
  @ViewChild('text', {read:ElementRef}) text?:ElementRef<HTMLImageElement>;


private logoAnimation!:Animation; 
private textAnimation!:Animation; 



  constructor(private fb:FormBuilder,
              private router:Router,
              private animationCtrl:AnimationController,
              private retornoService: UserService
              ) { 

    
  this.loginForm=this.fb.group({

      username: [
        '',
        [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z0-9]*$')
        ]
      ],
      
        password: [
        '',
        [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]*$')
        ]
      ]
      
      
  }); 


  }// Fin constructor

  onLoginAlumno() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
  
      // Validamos el usuario y la contraseña para "alumno"
      const respuesta = this.retornoService.validaServicio(username, password);
      if (respuesta && username === 'estudiante') {
        const navigationExtras: NavigationExtras = {
          state: { nombre: username }
        };
        this.router.navigate(['home'], navigationExtras);
      } else {
        alert('Usuario o contraseña inválidos para Alumno');
      }
    }
  }
  
  onLoginDocente() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
  
      // Validamos el usuario y la contraseña para "docente"
      const respuesta = this.retornoService.validaServicio(username, password);
      if (respuesta && username === 'docente') {
        const navigationExtras: NavigationExtras = {
          state: { nombre: username }
        };
        this.router.navigate(['home2'], navigationExtras);
      } else {
        alert('Usuario o contraseña inválidos para Docente');
      }
    }
  }

  //onLogin() {
    //if(this.loginForm.valid){
      //const username = this.loginForm.get('username')?.value;
      //const password = this.loginForm.get('password')?.value;

      // generamos la variable bool_valido la cual indica si el formulario es valido
      //let bool_valido=true;

      //Si el usuario es invalido, cambiarmos el bool_valido a false
      //if(username!=this.usuario){
        //bool_valido=false;
      //}
      //if(password!=this.password){
        //bool_valido=false;
      //}
      
      //validamos usuario y password en mel servicio 

    

      //var respuesta: boolean=this.retornoService.validaServicio(username,password)

      //if(respuesta){
        //let navigationExtras:NavigationExtras={
          //state:{
            //nombre:username

          //}

        //}

       // this.router.navigate([`home`],navigationExtras);
      //}else{

        //alert(' usuario o contraseña invalida');
      //}



    // Navegar a Home y pasamos los parametros

    // Si bool_valido==true entonces seguimos adelante, en caso contrario mandamos un alert
      //if(bool_valido){

        // Localstorage es una varibale global que se maneja en toda la aplicacion
        // asignamos a la varibale "usuario" el "username" para poder mostrar el nonmbre del usuario 
        // en cualquier parte de la aplicacion
       /* localStorage.setItem("usuario",username);
        this.router.navigate(['home'],{ queryParams:{username,password}});   
      }
      else{
        alert("El usuario y/o contraseña es inválido");
      }
    }else{
      alert("El usuario y/o contraseña es inválido");
    } */
   
    //}

  //} // Final onLogin



toRegistro() {
  this.router.navigate(['registro'],  {queryParams:{}} ); 
    
    
  }// funcion ir a registro.
    
    
    
  ngAfterViewInit() {
    if(this.logo?.nativeElement && this.text?.nativeElement) {
      this.logoAnimation =this.animationCtrl.create()
      .addElement(this.logo.nativeElement)
      .duration(5000)
      .fromTo('opacity','0','1');
      
      this.textAnimation =this.animationCtrl.create()
      .addElement(this.text.nativeElement)
      .duration(1000)
      .fromTo('transform','translateY(20px)', 'translateY(0)');

      this.logoAnimation.play()
      this.textAnimation.play()


    } // final If
      else{
        console.error('Los elementos no fueron encontrados')
      }


  } // final After


  /*recuperarClave(){
    alert("recupear clave");
  }*/
    

} // Final 

