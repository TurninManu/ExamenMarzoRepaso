import { JsonServerProvider } from './../../providers/json-server/json-server';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Carrera } from '../../modelo/carrera';

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
export class FormularioCarreraPage{

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
    this.jsonServerProvider.postCarrera(new Carrera(null,
      this.formu.get('fecha').value, 
      this.formu.get('latitud').value, 
      this.formu.get('longitud').value, 
      this.formu.get('descripcion').value, 
      this.formu.get('distancia').value));
  }

}
