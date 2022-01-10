import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Menus, Perfil } from '../../interfaces';
import { Sesion } from '../../metodos';
import { UsuariosService } from '../../_services/usuarios.service';
declare var $: any;
@Component({
  selector: 'app-register-form',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    public userServices: UsuariosService,
    private modalService: NgbModal,
    private _service: NotificationsService,
    private mySesion: Sesion,
  ) { }
  @Input()
  set muestraTexto(value: boolean) {
    this._muestraTexto = value;
  }
  get muestraTexto(): boolean {
    return this._muestraTexto;
  }
  set userAcepted(value: boolean) {
    this._userAcepted = value;
  }
  get userAcepted(): boolean {
    return this._userAcepted;
  }
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
  @Input()
  set esProv(value: boolean) {
    this._tipo = value;
  }
  get esProveedor(): boolean {
    return this._tipo;
  }
  get esCliente(): boolean {
    return this._tipo !== true;
  }
  get mostrarNotificacion(): boolean {
    if (this._perfil) {
      if (this._perfil.hash && this._perfil.hash.length >= 1 && (this._perfil.hash_rep.length >= 1)) {
        return true;
      }
    }
    return false;
  }
  get contraValida(): boolean {
    if (this._perfil) {
      if (this._perfil.hash && this._perfil.hash.length >= 1 && (this._perfil.hash === this._perfil.hash_rep)) {
        return true;
      }
    }
    return false;
  }
  get contraMinima(): boolean {
    if (this._perfil.hash.length >= 7 && (this._perfil.hash !== this._perfil.hash_rep)) {
      return false;
    }
    return true;
  }
  today: any;
  nacimientoToday: any;
  @BlockUI() blockUI: NgBlockUI;
  private _component: EventEmitter<string> = new EventEmitter<string>();
  private _componentStr: string;
  private _esModal: boolean;
  private _userAcepted = false;
  private _tipo: boolean;
  private _muestraTexto: boolean;
  _perfil: Perfil = new Perfil();
  private _titulo = '';
  public options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: false,
    animate: 'scale',
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxLength: 200
  };
  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, '300');
  }
  async aceptarUsuario(value: boolean, form?) {
    this.blockUI.start();
    if (!value) {
      this.blockUI.stop();
      this.userAcepted = value;
      if (form) {
        this.createError('Compruebe que sus contraseñas sean iguales');
      }
      return;
    }
    if (this._perfil.email.length >= 5 && this.validarEmail(this._perfil.email)) {
      if (this._perfil.hash.length <= 3 || this._perfil.hash.length <= 3 ||
        (this._perfil.hash !== this._perfil.hash_rep)) {
        this.createError('Compruebe que sus contraseñas esten ingresadas correctamente');
      } else {
        this.userAcepted = (value && (this._perfil ? true : false));
      }
    } else {
      this.createError('Su email no es valido');
    }
    this.blockUI.stop();
  }
  cancelar(value, form) {
    if (!value) {
      this.blockUI.stop();
      this.userAcepted = value;
      this._perfil.email = '';
      this._perfil.hash = '';
      this._perfil.hash_rep = '';
      $('#email').val('d');
      $('#password').val('d');
      $('#password_rep').val('d');
      $('#email').val('');
      $('#password').val('');
      $('#password_rep').val('');
      $('#email').focus();
    }
  }
  validarEmail(valor): boolean {
    return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      .test(valor));
  }
  registrar(social: boolean = false) {
    this.blockUI.start();
    const perfil = {
      email: this._perfil.email,
      hash: this._perfil.hash,
      nombre: this._perfil.nombre,
      apellido: this._perfil.apellido
    };
    this.userServices.create(perfil)
      .then((response: any) => {
        this.mySesion.actualizaPerfil(response);
        if (this.mySesion.validarSesion()) {
          this.router.navigate([`./dashboard/inicio`]);
        } else {
          this.createError('Error iniciando sesion');
        }
        this.blockUI.stop();
      }).catch((error) => {
        if (error.msg) {
          this.createError(error.msg);
        } else {
          this.createError('Error desconocido, por favor trate otra vez');
        }
        console.log(error);
        this.blockUI.stop();
      });
  }
  navegar(data: Menus, evento?: MouseEvent) {
    if (evento) {
      evento.stopPropagation();
    }
    if (this.modalService.hasOpenModals()) {
      this._componentStr = data.url;
      this._component.emit(this._componentStr);
    } else {
      this.router.navigate([`${data.url}`]);
    }
  }
  createSuccess(success) {
    this._service.success('¡Éxito!', success);
  }
  createError(error) {
    this._service.error('¡Error!', error);
  }
}
