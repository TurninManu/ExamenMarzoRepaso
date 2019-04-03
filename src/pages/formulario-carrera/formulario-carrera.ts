import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
export class FormularioCarreraPage {

  formu:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.formu=new FormGroup({
      fecha:new FormControl('', Validators.compose([
        Validators.required,
      ])),
      latitud:new FormControl('', Validators.compose([
        Validators.required,
      ])),
      longitud:new FormControl('', Validators.compose([
        Validators.required,
      ])),
      descripcion:new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z]*$')
      ])),
      distancia:new FormControl('', Validators.compose([
        Validators.required,
      ]))
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormularioCarreraPage');
  }

}
