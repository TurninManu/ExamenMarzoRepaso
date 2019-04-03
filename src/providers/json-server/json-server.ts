import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { Clasificacion } from '../../modelo/clasificacion';
import { Carrera } from '../../modelo/carrera';

/*
  Generated class for the JsonServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JsonServerProvider {

  private URL:string="http://localhost:3000";
  listener:UserServiceProviderListener;

  setListener(listener:UserServiceProviderListener){
    this.listener=listener;
  }

  constructor(public http: HttpClient) {
    console.log('Hello JsonServerProvider Provider');
  }

  public getCarreras(){
    this.http.get(this.URL + "/carreras?_sort=fecha&_order=DESC").subscribe((data:Carrera[]) => {
      this.listener.onGetCarrerasResponse(data, null);
    }),
    (error => {
      this.listener.onGetCarrerasResponse(null, "error al leer las carreras");
    });
  }

  public getClasificacionesCarrera(carrera:Carrera){
    this.http.get(this.URL + "/clasificaciones?idCarrera="+carrera.id+"&_sort=tiempo&_order=ASC").subscribe((data:Clasificacion[]) => {
      this.listener.onGetClasificacionesCarreraResponse(data, null);
    }),
    (error => {
      this.listener.onGetClasificacionesCarreraResponse(null, "error al leer las clasificaciones");
    });
  }

  public getUsuarios(){
    let usr= new Map<number, Usuario>();

    this.http.get(this.URL + "/usuarios").subscribe((data:Usuario[]) => {
      data.forEach(e => {
        usr.set(e.id, e);
      });
      this.listener.onGetUsuariosResponse(usr, null);
    }),
    (error => {
      this.listener.onGetUsuariosResponse(null, "error al leer los usuarios");
    });
  }

}

export interface UserServiceProviderListener {
  onGetUsuarioResponse(usuario:Usuario, error:string);
  onGetUsuariosPorCadenaBusquedaResponse(usuarios:Usuario[], error:string);
  onGetUsuariosResponse(usuarios:Map<number,Usuario>, error:string);
  onGetCarrerasResponse(carreras:Carrera[], error:String);
  onGetClasificacionesCarreraResponse(clasificaciones:Clasificacion[],error:string);
  onPostCarreraResponse(carrera:Carrera, error:string);
  }
