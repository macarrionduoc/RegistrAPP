import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(){}

  // Método para validar el ingreso de usuario desde un servicio
  validaServicio(usuario: string, clave: number): boolean {
    // Validación para el usuario estudiante
    if (usuario == 'estudiante' && clave == 1234) {
      return true;
    }
    // Validación para el usuario docente
    else if (usuario == 'docente' && clave == 4321) {
      return true;
    } 
    else {
      return false;
    }
  }






  
}




















// crear metodo para validar ingreso del usuario  desde un servicio 




