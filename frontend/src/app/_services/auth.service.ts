import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Sesion } from './../metodos';
@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private basePath: string = environment.url;
  constructor(
    private http: HttpClient,
    private mySesion: Sesion
  ) {
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }
  Authentication(login: any): Promise<any> {
    const url = `${this.basePath}/login`;
    return this.http.post(url, login)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }
  recovery(form: any): Promise<any> {
    const url = `${this.basePath}/recovery/${form.id}`;
    this.mySesion.reloadToken();
    return this.http.post(url, form, { headers: this.mySesion.headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }
}
