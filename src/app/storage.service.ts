/*import { Injectable } from '@angular/core';
import { IonicStorageModule, Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  // variables auxiliares
  datos:any[]=[];
  dato:any={};


private storage:Storage | null = null; // definiendo propiedad storage


  constructor( private storageInstance:Storage) {
    this.init(); // inicializo el almacenamiento
  }

  // construccion incializacion 

  async init(){
  // configurar libreria 
    const storage= await this.storageInstance.create();

    if(!this.storage){
      this.storage =await this.storageInstance.create();
    }
    }// fin Init

async agregar(key: string, jsonAgregar:any) {
    this.datos = await this.storage?.get(key) || []; //llave - valor
    let existe = await this.obtenerDato(key,jsonAgregar.identificador)

    if (existe == undefined){
      this.datos.push(jsonAgregar)
      await this.storage?.set(key,this.datos);
      return true;
    }
    return false;
}// fin Agregar

async obtenerDato(key:string, identificador: string){
  this.datos = await this.storage?.get(key) || [];
  this.dato = this.datos.find(valor => valor.identificador == identificador);
  return this.dato;
}// fin obtener dato


async  obtenerDatos(key:string) {
  if (!this.storage) {
    throw new Error ('Storage no esta inicializado')
  }
  this.datos =await this.storage.get(key) || [];
  return this.datos;


} // fin obtenerDatos


async eliminar(key:string, identificador:string){
  this.datos =await this.storage?.get(key) || [];

  this.datos.forEach( (valor,indice) => {
    if(valor.identificador == identificador){

      this.datos.splice(indice,1)
    }
    });
    await this.storage?.set(key,this.datos)
} // Fin eliminar


async actualizar(key:string, jsonModificado:any) {
  this.datos =await this.storage?.get(key) || [];
  let indice =this.datos.findIndex(valor => valor.identificador == jsonModificado.identificador)

  this.datos[indice] = jsonModificado;
  await this.storage?.set(key,this.datos)
}

}// fin storage service clase*/


//////////////nuevo codigo//////////////////
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})




export class StorageService {

  // Variables auxiliares
  datos: any[] = [];
  dato: any = {};

  private storage: Storage | null = null; // Definiendo propiedad storage

  constructor(private storageInstance: Storage) {
    this.init(); // Inicializo el almacenamiento
  }

  // Inicialización del almacenamiento
  async init() {
    if (!this.storage) {
      this.storage = await this.storageInstance.create();
    }
  }

  // Método para agregar datos sin verificación de identificador, adecuado para almacenar múltiples entradas QR
  async agregar(key: string, jsonAgregar: any) {
    this.datos = await this.storage?.get(key) || []; // Obtiene los datos actuales en la clave

    // No se verifica identificador; se agrega el objeto directamente
    this.datos.push(jsonAgregar);
    await this.storage?.set(key, this.datos); // Guarda el nuevo arreglo en el almacenamiento
    return true;
  }

  async obtenerDato(key: string, identificador: string) {
    this.datos = await this.storage?.get(key) || [];
    this.dato = this.datos.find(valor => valor.identificador === identificador);
    return this.dato;
  }

  async obtenerDatos(key: string) {
    if (!this.storage) {
      throw new Error('Storage no está inicializado');
    }
    this.datos = await this.storage.get(key) || [];
    return this.datos;
  }

  //  async eliminar(key: string, id: string) {
    async eliminar(key: string, identificador: string) {
      this.datos = await this.storage?.get(key) || [];
        // Filtrar el dato que coincide con el ID
  //    this.datos = this.datos.filter(valor => valor.id !== id);
      this.datos = this.datos.filter(valor => valor.identificador !== identificador);
      await this.storage?.set(key, this.datos);
    }
  
    async actualizar(key: string, jsonModificado: any) {
      this.datos = await this.storage?.get(key) || [];
      const indice = this.datos.findIndex(valor => valor.identificador === jsonModificado.identificador);
      if (indice !== -1) {
        this.datos[indice] = jsonModificado;
        await this.storage?.set(key, this.datos);
      }
    }
  }