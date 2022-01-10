import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Favorito, Imagen, ListaBusqueda } from './../../interfaces';
import { Sesion } from './../../metodos';
import { ConsultasService } from './../../_services/consultas.service';
import { FavoritosService } from './../../_services/favoritos.service';
declare var $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: []
})
export class InicioComponent implements OnInit {
  constructor(
    private favoritoService: FavoritosService,
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
  set listaFavs(value: ListaBusqueda[]) {
    this._listaFavs = value;
  }
  get listaFavs(): ListaBusqueda[] {
    return this._listaFavs;
  }
  get listaFavsAuxiliar(): ListaBusqueda[] {
    return this._listaFavs;
  }
  set proveedor(value: ListaBusqueda) {
    this._proveedor = value;
  }
  get proveedor(): ListaBusqueda {
    return this._proveedor;
  }
  get sesion() {
    return this.mySesion.validarSesion();
  }
  @BlockUI() blockUI: NgBlockUI;
  private _proveedor: ListaBusqueda = new ListaBusqueda();
  private _numReg = 0;
  private _limit = 10;
  private _offset = 0;
  private _page = 1;
  active = 1;
  estaSelec = false;
  sliders: Imagen[] = [{ url: '../../assets/images/logo.png', titulo: '', descripcion: '' }];
  private _listaFavs: ListaBusqueda[] = [
  ];
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

  async ngOnInit() {
    await this.cargarFavoritos();
  }
  reiniciarImagen() {
    this.sliders = [{ url: '../../assets/images/logo.png', titulo: '', descripcion: '' }];
    this.estaSelec = false;
  }
  async cargarFavoritos() {
    this.listaFavs.length = 0;
    if (!this.mySesion.validarSesion()) {
      return;
    }
    await this.favoritoService.getSingle(this.mySesion.perfil.id).then((response: Favorito[]) => {
      response.forEach(async (elemento: Favorito) => {
        const item = new ListaBusqueda();
        item.nombre = elemento.subRazaId;
        item.imagenes = await this.obtenerImagenes(elemento.razaId, elemento.subRazaId);
        this.listaFavs.push(item);
      });
    }).catch(error => {
      console.log(error);
    });
  }
  async obtenerImagenes(raza: string, subRaza: string): Promise<Imagen[]> {
    const form = {
      subraza: subRaza,
      raza
    };
    const imagenes: Imagen[] = [];
    await this.consultasService.getImages(form).then((response: { message: string[], status: string }) => {
      response.message.forEach((elemento: string, index) => {
        const img = new Imagen();
        img.url = elemento;
        img.id = index;
        imagenes.push(img);
      });
    }).catch(error => {
      console.log(error);
    });
    return imagenes;
  }

  cambioPagina(value: any) {
    this._page = value;
    this.cargarFavoritos();
  }

  seleccionarRaza(value: ListaBusqueda) {
    this.estaSelec = true;
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
