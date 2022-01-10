import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ChangePasswordForm } from './../interfaces';
import { Sesion } from './../metodos';
import { AuthServices } from './../_services/auth.service';
import { ChangePassFormulario } from './change-pass-form.component';
declare var $: any;
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: [],
})
export class ChangePassComponent implements OnInit {
  constructor(
    private AuthService: AuthServices,
    private _service: NotificationsService,
    private config: NgbModalConfig,
    private mySesion: Sesion,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.size = 'lg';
  }
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
  @BlockUI() blockUI: NgBlockUI;
  @ViewChild(ChangePassFormulario) changePassForm: ChangePassFormulario;
  private _esModal = false;
  private _muestraTexto = false;
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
  open(content) {
    this.modalService.open(content);
  }
  ngOnInit(): void {
    if (this.esModal) {
      const temp = ChangePassFormulario;
      if (this.titulo) {
        if (this.changePassForm) {
          this.changePassForm.titulo = this.titulo;
        }
      }
      temp.prototype.titulo = this.titulo;
      this.modalService.open(temp);
    }
  }
  changePass(formValue: ChangePasswordForm, form: any) {
    this.mySesion.validarSesion();
    formValue.perfil = this.mySesion.perfil;
    formValue.id = this.mySesion.perfil.id;
    formValue.new_pass_rep = btoa(formValue.new_pass_rep);
    formValue.new_pass = btoa(formValue.new_pass);
    formValue.old_pass = btoa(formValue.old_pass);
    this.blockUI.start();
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

}
