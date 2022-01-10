import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Menus, Perfil } from '../../interfaces';
import { Sesion } from '../../metodos';
declare var $: any;
@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private mySesion: Sesion,
    private _service: NotificationsService,
  ) { }
  @Input()
  set esModal(value: boolean) {
    this._esModal = value;
  }
  get esModal(): boolean {
    return this._esModal;
  }
  @Input()
  set muestraTexto(value: boolean) {
    this._muestraTexto = value;
  }
  get muestraTexto(): boolean {
    return this._muestraTexto;
  }
  @Input()
  set titulo(value: string) {
    this._titulo = value;
  }
  get titulo(): string {
    return this._titulo;
  }
  set data(value: Perfil) {
    this._data = value;
  }
  get data(): Perfil {
    return this._data;
  }
  @Input()
  set dinamicLink(value: string) {
    if (value) {
      this.mySesion.lastLink = value;
    }
    this._dinamicLink = value;
  }
  @Output()
  get component(): EventEmitter<string> {
    this._component.emit(this._componentStr);
    return this._component;
  }
  get componentStr(): string {
    return this._componentStr;
  }
  @BlockUI() blockUI: NgBlockUI;
  private _component: EventEmitter<string> = new EventEmitter<string>();
  private _componentStr: string;
  private _data: Perfil = new Perfil();
  private _esModal = false;
  private _muestraTexto = false;
  private _dinamicLink = '';
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
  ngOnInit() {
    $('html, body').animate({ scrollTop: 0 }, '300');
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
  async recovery() {


  }
  closeModal() {
    this.modalService.dismissAll();
  }
  createSuccess(success) {
    this._service.success('¡Éxito!', success);
  }
  createError(error) {
    this._service.error('¡Error!', error);
  }
  public ngOnDestroy() {
    if (this.mySesion.captchaSubscription) {
      this.mySesion.captchaSubscription.unsubscribe();
    }
  }

}
