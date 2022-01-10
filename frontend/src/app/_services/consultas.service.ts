import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Sesion } from './../metodos';
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
  getAll(): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/consultas`;
    return this.http.get(url, { headers: this.mySesion.headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }
  getSubRazas(raza: string, id: number): Promise<any> {
    this.mySesion.reloadToken();
    const filter = raza ? '?raza=' + raza : '';
    const url = `${this.basePath}/consultas/${id}${filter}`;
    return this.http.get(url, { headers: this.mySesion.headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }
  getImages(form): Promise<any> {
    const url = `${this.basePath}/consultas/imagenes`;
    this.mySesion.reloadToken();
    return this.http.post(url, form, { headers: this.mySesion.headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }
}
