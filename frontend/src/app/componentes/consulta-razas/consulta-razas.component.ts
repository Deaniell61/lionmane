import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Sesion } from 'src/app/metodos';
import { Favorito, Imagen, ListaBusqueda } from './../../interfaces';
import { ConsultasService } from './../../_services/consultas.service';
import { FavoritosService } from './../../_services/favoritos.service';

@Component({
  selector: 'app-consulta-razas',
  templateUrl: './consulta-razas.component.html',
  styleUrls: ['./consulta-razas.component.css']
})
export class ConsultaRazasComponent implements OnInit {
  @Input() lista: ListaBusqueda[];
  @Output()
  get seleccionarRaza(): EventEmitter<ListaBusqueda> {
    this._seleccionarRaza.emit(this._seleccionado);
    return this._seleccionarRaza;
  }
  listaSub: ListaBusqueda[] = [];
  listaFavs: Favorito[] = [];
  rate = 0;
  _seleccionado: ListaBusqueda;
  private _seleccionarRaza: EventEmitter<ListaBusqueda> = new EventEmitter<ListaBusqueda>();
  constructor(
    private consultasService: ConsultasService,
    private favoritosService: FavoritosService,
    private _service: NotificationsService,
    private mySesion: Sesion
  ) { }
  @BlockUI() blockUI: NgBlockUI;

  ngOnInit(): void {
    this.cargarFavoritos();
  }

  async consultarRaza(value: string) {
    this.listaSub.length = 0;
    this.blockUI.start();
    await this.consultasService.getSubRazas(value, this.mySesion.perfil.id).then((response: {
      id: number, raza: string, estado: boolean, usuarioId: number, createdAt: Date, consulta: string[]
    }) => {
      response.consulta.forEach(async (element: string) => {
        const raza: ListaBusqueda = new ListaBusqueda();
        raza.nombre = element;
        raza.validacion = this.isFav(element);
        raza.imagenes = await this.obtenerImagenes(value, element);
        this.listaSub.push(raza);
      });
      this.blockUI.stop();
    }).catch(error => {
      this.blockUI.stop();
      console.log(error);
    });
  }
  seleccionar(value: ListaBusqueda) {
    this._seleccionado = value;
    this._seleccionarRaza.emit(this._seleccionado);
  }
  cargarFavoritos() {
    this.listaFavs.length = 0;
    this.favoritosService.getSingle(this.mySesion.perfil.id).then((response: Favorito[]) => {
      this.listaFavs = response;
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
  agregarFavoritos(raza: string, subRaza: string) {
    const form = {
      raza,
      subRaza,
      id: this.mySesion.perfil.id
    };
    this.blockUI.start();
    this.favoritosService.create(form).then((response: Favorito) => {
      this.listaFavs.push(response);
      this.blockUI.stop();
    }).catch(error => {
      this.blockUI.stop();
      console.log(error);
    });
  }

  isFav(subRaza: string) {
    if (this.listaFavs.length > 0) {
      const fav = this.listaFavs.find(element => element.subRazaId === subRaza);
      if (fav) {
        return 1;
      } else {
        return 0;
      }
    } else {
      this.cargarFavoritos();
      this.isFav(subRaza);
    }
  }

}
