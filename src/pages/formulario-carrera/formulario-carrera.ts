import { JsonServerProvider } from './../../providers/json-server/json-server';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserServiceProviderListener } from '../../providers/json-server/json-server';
import { Usuario } from '../../modelo/usuario';
import { Carrera } from '../../modelo/carrera';
import { Clasificacion } from '../../modelo/clasificacion';

/**
 * Generated class for the FormularioCarreraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-formulario-carrera',
  templateUrl: 'formulario-carrera.html',
})
export class FormularioCarreraPage implements UserServiceProviderListener{

  formu:FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonServerProvider:JsonServerProvider, public toastController:ToastController) {
    this.formu=new FormGroup({
      fecha:new FormControl('', Validators.compose([
        Validators.required,
      ])),
      latitud:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^-?[0-9]+(\.[0-9][0-9])[0-9]*$')
      ])),
      longitud:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^-?[0-9]+(\.[0-9][0-9])[0-9]*$')
      ])),
      descripcion:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z ]*$')
      ])),
      distancia:new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.pattern('^[0-9]+$')
      ]))
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormularioCarreraPage');
  }

  public addCarrera(){
    this.jsonServerProvider.postCarrera(new Carrera(-1,
      this.formu.get('fecha').value, 
      this.formu.get('latitud').value, 
      this.formu.get('longitud').value, 
      this.formu.get('descripcion').value, 
      this.formu.get('distancia').value));
  }

  onGetUsuarioResponse(usuario: Usuario, error:string) {
    throw new Error("Method not implemented.");
  }
  onGetUsuariosPorCadenaBusquedaResponse(usuarios: Usuario[], error: string) {
    throw new Error("Method not implemented.");
  }
  onGetUsuariosResponse(usuarios: Map<number, Usuario>, error: string) {
    throw new Error("Method not implemented.");
  }
  onGetCarrerasResponse(carreras: Carrera[], error: string) {
    throw new Error("Method not implemented.");
  }
  onGetClasificacionesCarreraResponse(clasificaciones: Clasificacion[], error: string) {
    throw new Error("Method not implemented.");
  }
  onPostCarreraResponse(carrera: Carrera, error: string) {
    throw new Error("Method not implemented.");
  }

}
