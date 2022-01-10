import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Menus, Perfil } from '../../interfaces';
import { Sesion } from '../../metodos';
import { AuthServices } from '../../_services/auth.service';
import { UsuariosService } from '../../_services/usuarios.service';
declare var $: any;
@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginFormComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthServices,
    private modalService: NgbModal,
    private userService: UsuariosService,
    private _service: NotificationsService,
    private mySesion: Sesion,
  ) { }
  @Input()
  set titulo(value: string) {
    this._titulo = value;
  }
  get titulo(): string {
    return this._titulo;
  }
  @Output()
  get component(): EventEmitter<string> {
    this._component.emit(this._componentStr);
    return this._component;
  }
  get componentStr(): string {
    return this._componentStr;
  }
  auth: any;
  private _component: EventEmitter<string> = new EventEmitter<string>();
  private _componentStr: string;
  @BlockUI() blockUI: NgBlockUI;
  private _titulo = '';
  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    lastOnBottom: false,
    animate: 'scale',
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };

  async login(socialusers: Perfil, social: boolean = false) {
    this.blockUI.start();
    await this.authenticationService.Authentication(socialusers)
      .then((response: Perfil) => {
        if (!response.imagenes) {
          response.imagenes = [];
        }
        this.mySesion.actualizaPerfil(response);
        if (this.mySesion.validarSesion()) {
          this.mySesion.actualizaPerfil();
          this.router.navigate([`./../dashboard/inicio`]);
        } else {
          this.createError('Error iniciando sesion');
        }
        this.blockUI.stop();
      }).catch((e) => {
        if (e.status === 404) {
          this.createError('Usuario no encontrado');
        } else if (e.status === 401) {
          this.createError('Usuario o Contraseña Incorrectas');
        } else {
          this.createError('Error iniciando sesion');
        }
        console.log(e);
        this.blockUI.stop();
      });
  }
  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, '300');
  }
  navegar(data: Menus, evento?: MouseEvent) {
    if (this.modalService.hasOpenModals()) {
      this._componentStr = data.url;
      this._component.emit(this._componentStr);
    } else {
      this.router.navigate([`${data.url}`]);
    }
    if (evento) {
      evento.stopPropagation();
    }
  }
  createSuccess(success) {
    this._service.success('¡Éxito!', success);
  }
  createError(error) {
    this._service.error('¡Error!', error);
  }
}
