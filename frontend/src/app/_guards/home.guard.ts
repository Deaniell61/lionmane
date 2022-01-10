import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Sesion } from './../metodos';
@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private sesion: Sesion, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.sesion.actualizaPerfil();
    const door = this.sesion.validarSesion();
    if (door) {
      this.router.navigate(['./../dashboard/inicio']);
    }
    if (!door) {
      return true;
    }
  }
}
