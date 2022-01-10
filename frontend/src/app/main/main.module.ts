import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { FormulariosModule } from '../formularios/formularios.module';

@NgModule({
  declarations: [
    MainComponent,
    PerfilComponent,
  ],
  imports: [
    CommonModule,
    ComponentesModule,
    FormulariosModule,
    NgbModule,
    SimpleNotificationsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
