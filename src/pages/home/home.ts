import { FormularioCarreraPage } from './../formulario-carrera/formulario-carrera';
import { JsonServerProvider } from './../../providers/json-server/json-server';
import { Clasificacion } from './../../modelo/clasificacion';
import { Carrera } from './../../modelo/carrera';
import { Usuario } from './../../modelo/usuario';
import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { UserServiceProviderListener } from '../../providers/json-server/json-server';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements UserServiceProviderListener{

  carreras:Carrera[];
  clasificaciones:Clasificacion[];
  usuarios:Map<number, Usuario>;

  usuario:Usuario;
  activarEstrella:Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonServerProvider:JsonServerProvider, public toastController:ToastController) {
    jsonServerProvider.setListener(this);
    jsonServerProvider.getCarreras();
    jsonServerProvider.getUsuarios();
    this.activarEstrella=false;


    this.usuario=navParams.get("usuario");
  }

  public obtenerClasificaciones(c:Carrera){
    this.activarEstrella=true;
    this.jsonServerProvider.getClasificacionesCarrera(c);
  }

  public abrirFormulario(){
    this.navCtrl.push(FormularioCarreraPage);
  }

  public obtenerClasificacion(){
    this.
  }

  onGetUsuarioResponse(usuario: Usuario, error:string) {
    throw new Error("Method not implemented.");
  }
  onGetUsuariosPorCadenaBusquedaResponse(usuarios: Usuario[], error: string) {
    throw new Error("Method not implemented.");
  }
  onGetUsuariosResponse(usuarios: Map<number, Usuario>, error: string) {
    if(error==null){
      this.usuarios=usuarios;
      console.log("Usuarios:" + usuarios);
    }else{
      const toast = this.toastController.create({
        message: error,
        duration: 2000
      });
      toast.present();
    }
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
    if(error==null){
      this.clasificaciones=clasificaciones;
    }else{
      const toast = this.toastController.create({
        message: error,
        duration: 2000
      });
      toast.present();
    }
  }
  onPostCarreraResponse(carrera: Carrera, error: string) {
    if(error==null){
      const toast = this.toastController.create({
        message: "Carrera añadida correctamente",
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop();
      this.jsonServerProvider.getCarreras();

    }else{
      const toast = this.toastController.create({
        message: error,
        duration: 2000
      });
      toast.present();
    }
  }

}
