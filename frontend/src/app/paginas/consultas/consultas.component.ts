import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ListaBusqueda } from './../../interfaces';
import { ConsultasService } from './../../_services/consultas.service';
import { Sesion } from './../../metodos';
declare var $: any;
@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {
  constructor(
    private consultasService: ConsultasService,
    private _service: NotificationsService,
    private mySesion: Sesion
  ) { }
  set numReg(value: number) {
    this._numReg = value;
  }
  get numReg(): number {
    return this._numReg;
  }
  set limit(value: number) {
    this._limit = value;
  }
  get limit(): number {
    return this._limit;
  }
  set offset(value: number) {
    this._offset = value;
  }
  get offset(): number {
    const actual = (this.page - 1) * this._limit;
    this._offset = actual;
    return this._offset;
  }
  set page(value: number) {
    this._page = value;
  }
  get page(): number {
    return this._page;
  }
  set listaPerros(value: ListaBusqueda[]) {
    this._listaPerros = value;
  }
  get listaPerros(): ListaBusqueda[] {
    return this._listaPerros;
  }
  get listaPerrosAuxiliar(): ListaBusqueda[] {
    return this._listaPerros;
  }
  set perro(value: ListaBusqueda) {
    this._perro = value;
  }
  get perro(): ListaBusqueda {
    return this._perro;
  }
  get sesion() {
    return this.mySesion.validarSesion();
  }
  @BlockUI() blockUI: NgBlockUI;
  private _perro: ListaBusqueda = new ListaBusqueda();
  private _numReg = 0;
  private _limit = 10;
  private _offset = 0;
  private _page = 1;
  active = 1;
  sliders = [];
  private _listaPerros: ListaBusqueda[] = [
    {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://placehold.it/500x250?text=Cargando...',
    },
    {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://placehold.it/500x250?text=Cargando...',
    },
    {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://placehold.it/500x250?text=Cargando...',
    }, {
      id: 1,
      nombre: 'Cargando...',
      imagen: 'https://placehold.it/500x250?text=Cargando...',
    }
  ];
  private _listaPerrosAuxiliar: ListaBusqueda[] = this._listaPerros;
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

  ngOnInit(): void {
    this.cargarFavoritos();
  }
  cargarFavoritos() {
    this.listaPerros.length = 0;
    this.consultasService.getAll().then((response: { message: string[], status: string }) => {
      response.message.forEach(element => {
        const busqueda: ListaBusqueda = new ListaBusqueda();
        busqueda.nombre = element;
        this.listaPerros.push(busqueda);
      });
    }).catch(error => {
      console.log(error);
    });
  }

  cambioPagina(value: any) {
    this._page = value;
    this.cargarFavoritos();
  }
  seleccionarRaza(value: ListaBusqueda) {
    if (value.imagenes.length > 0) {
      this.sliders = value.imagenes;
      $('html, body').animate({ scrollTop: 0 }, '300');
    }
  }
  createSuccess(success) {
    this._service.success('¡Éxito!', success);
  }
  createError(error) {
    this._service.error('¡Error!', error);
  }
}
