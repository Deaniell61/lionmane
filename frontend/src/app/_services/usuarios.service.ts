import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Sesion } from './../metodos';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
  getAll(): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/usuarios`;
    return this.http.get(url, { headers: this.mySesion.headers })
      .toPromise()
      .then(response => {
        // console.log(response;)
        return response;
      })
      .catch(this.handleError);
  }
  create(form): Promise<any> {
    const url = `${this.basePath}/registro`;
    return this.http.post(url, form)
      .toPromise()
      .then(response => {
        // console.log(response)
        return response;
      })
      .catch(this.handleError);
  }
  getSingle(id: number): Promise<any> {
    this.mySesion.reloadToken();
    const url = `${this.basePath}/usuarios/${id}`;
    return this.http.get(url, { headers: this.mySesion.headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }
}
