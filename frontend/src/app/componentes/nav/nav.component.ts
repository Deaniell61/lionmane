import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Menus, Perfil } from './../../interfaces';
import { Sesion } from './../../metodos';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, AfterViewInit {
  private _menus: Menus[];
  private _sesion: boolean;
  private _esAdmin: boolean;
  private _perfil: Perfil;
  private _logo = 'assets/images/logo.png';
  constructor(
    private router: Router,
    private mySesion: Sesion,
    private cdref: ChangeDetectorRef,
    private localSt: LocalStorageService
  ) { }
  public isMenuCollapsed = true;
  public isFullScreeen = window.screen.width > 500;
  ngOnInit(): void {
    this.iniciarMenus();
    this.validarSesion();
  }
  validarSesion() {
    this.mySesion.actualizaPerfil();
  }
  navegar(data: Menus, id?: number, evento?: MouseEvent, inicio?: boolean) {
    if (data.evento) {
      eval.call(data.evento);
    }
    if (evento) {
      evento.stopPropagation();
    }
    if (inicio) {
      const urls = data.url.split('/');
      data.url = urls[0] + '/' + 'inicio';
    }
    this.router.navigate([data.url]);
    if (id && id > 0) {
      this.localSt.store('currentSelectedId', btoa(id + ''));
    }
  }
  @HostListener('window:resize', [])
  private onResize() {
    this.detectScreen();
  }
  ngAfterViewInit() {
    this._sesion = this.mySesion.validarSesion();
    this.detectScreen();
    this.validarSesion();
    this.mySesion.actualizaPerfil();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentChecked() {
    if (this._logo && this._logo.length <= 0) {
      this._logo = 'assets/images/logo.png';
    }
    this.cdref.detectChanges();
  }
  private detectScreen() {
    this.isFullScreeen = window.screen.width > 500;
  }
  iniciarMenus(): void {
    this._menus = [
      {
        sesion: false,
        select: false,
        url: '../inicio',
        inicio: true,
        evento: null,
        nombre: 'Inicio'
      },
      {
        sesion: true,
        select: false,
        url: '../inicio',
        inicio: true,
        evento: null,
        nombre: 'Inicio'
      },
      {
        sesion: true,
        select: false,
        url: '../../consultas',
        inicio: false,
        evento: null,
        nombre: 'Consultar'
      },
      {
        sesion: false,
        select: false,
        url: '../login',
        evento: null,
        nombre: 'Ingresar'
      },
      {
        sesion: false,
        select: false,
        url: '../register',
        evento: null,
        nombre: 'Registrarse'
      },
      {
        sesion: true,
        select: false,
        url: '../dashboard',
        evento: null,
        nombre: 'Dashboard',
        submenu: [
          {
            sesion: true,
            select: false,
            url: '../dashboard/perfil',
            evento: null,
            nombre: 'Perfil'
          },
          {
            sesion: true,
            select: false,
            url: '../logout',
            nombre: 'Salir'
          }
        ]
      }
    ];
  }
  @Input()
  set menus(values: Menus[]) {
    this._menus = values;
  }
  get menus(): Menus[] {
    return this._menus;
  }
  @Input()
  set logo(values: string) {
    this._logo = values;
  }
  get logo(): string {
    return this._logo;
  }
  set perfil(values: Perfil) {
    this._perfil = values;
  }
  get perfil(): Perfil {
    this._perfil = this.mySesion.perfil;
    return this._perfil;
  }
  set sesion(value: boolean) {
    this._sesion = value;
  }
  get sesion(): boolean {
    this._sesion = this.mySesion.validarSesion();
    return this._sesion;
  }
  @Input()
  set esAdmin(value: boolean) {
    this._esAdmin = value;
  }
  get esAdmin(): boolean {
    return this._esAdmin;
  }
}
