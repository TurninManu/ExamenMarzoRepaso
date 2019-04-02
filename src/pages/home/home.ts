import { JsonServerProvider } from './../../providers/json-server/json-server';
import { Clasificacion } from './../../modelo/clasificacion';
import { Carrera } from './../../modelo/carrera';
import { Usuario } from './../../modelo/usuario';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UserServiceProviderListener } from '../../providers/json-server/json-server';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements UserServiceProviderListener{

  carreras:Carrera[];

  constructor(public navCtrl: NavController, public jsonServerProvider:JsonServerProvider, public toastController:ToastController) {
    jsonServerProvider.setListener(this);

    jsonServerProvider.getCarreras();
  }

  onGetUsuarioResponse(usuario: Usuario, errorString: any) {
    throw new Error("Method not implemented.");
  }
  onGetUsuariosPorCadenaBusquedaResponse(usuarios: Usuario[], error: string) {
    throw new Error("Method not implemented.");
  }
  onGetUsuariosResponse(usuarios: Map<number, Usuario>, error: string) {
    throw new Error("Method not implemented.");
  }
  onGetCarrerasResponse(carreras: Carrera[], error: string) {
    if(error==null){
      this.carreras=carreras;
    }else{
      const toast = this.toastController.create({
        message: error,
        duration: 2000
      });
      toast.present();
    }
  }
  onGetClasificacionesCarreraResponse(clasificaciones: Clasificacion[], error: string) {
    throw new Error("Method not implemented.");
  }
  onPostCarreraResponse(carrera: Carrera, error: string) {
    throw new Error("Method not implemented.");
  }

}
