import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/interfaces';
import { Sesion } from 'src/app/metodos';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: []
})
export class MainComponent implements OnInit {
  constructor(
    private mySesion: Sesion
  ) { }

  ngOnInit(): void {
    this.mySesion.actualizaPerfil();
  }
  get perfil(): Perfil {
    return this.mySesion.perfil;
  }
}
