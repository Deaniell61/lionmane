import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BlockUIModule } from 'ng-block-ui';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ChangePassFormulario } from './../change-pass/change-pass-form.component';
import { ChangePassComponent } from './../change-pass/change-pass.component';
import { FormulariosModule } from './../formularios/formularios.module';
import { ConsultaRazasComponent } from './consulta-razas/consulta-razas.component';
import { FooterComponent } from './footer/footer.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { LogoutComponent } from './logout/logout.component';
import { NavComponent } from './nav/nav.component';
import { SlidersComponent } from './sliders/sliders.component';

const components = [
  NavComponent,
  FooterComponent,
  ChangePassComponent,
  LogoutComponent,
  ChangePassFormulario,
  GaleriaComponent,
  ImagenesComponent,
  SlidersComponent,
  ConsultaRazasComponent
];
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    NgbModule,
    FormulariosModule,
    NgxWebstorageModule.forRoot(),
    NgbDropdownModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: components
})
export class ComponentesModule { }
