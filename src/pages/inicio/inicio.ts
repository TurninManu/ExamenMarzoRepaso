import { HomePage } from './../home/home';
import { JsonServerProvider } from './../../providers/json-server/json-server';
import { Clasificacion } from './../../modelo/clasificacion';
import { Carrera } from './../../modelo/carrera';
import { Usuario } from './../../modelo/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserServiceProviderListener } from '../../providers/json-server/json-server';

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage implements UserServiceProviderListener{
  
  usuarios:Usuario[];
  cadena:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonServerProvider:JsonServerProvider, public toastController:ToastController) {
    this.jsonServerProvider.setListener(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

  public buscar(){
    this.jsonServerProvider.getUsuariosPorCadenaBusqueda(this.cadena);
  }

  public inciarSesion(indice:number){
    this.navCtrl.setRoot(HomePage, {usuario:this.usuarios[indice]})
  }

  onGetUsuarioResponse(usuario: Usuario, error: string) {
    throw new Error("Method not implemented.");
  }
  onGetUsuariosPorCadenaBusquedaResponse(usuarios: Usuario[], error: string) {
    if(error==null){
      this.usuarios=usuarios;
    }else{
      const toast = this.toastController.create({
        message: error,
        duration: 2000
      });
      toast.present();
    }
  }
  onGetUsuariosResponse(usuarios: Map<number, Usuario>, error: string) {
    throw new Error("Method not implemented.");
  }
  onGetCarrerasResponse(carreras: Carrera[], error: String) {
    throw new Error("Method not implemented.");
  }
  onGetClasificacionesCarreraResponse(clasificaciones: Clasificacion[], error: string) {
    throw new Error("Method not implemented.");
  }
  onPostCarreraResponse(carrera: Carrera, error: string) {
    throw new Error("Method not implemented.");
  }
}
