import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { BlockUIModule } from 'ng-block-ui';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ComponentesModule } from './componentes/componentes.module';
import { FormulariosModule } from './formularios/formularios.module';
import { Sesion, Formatos, Encript, Constantes } from './metodos';

import { AuthServices } from './_services/auth.service';
import { ConsultasComponent } from './paginas/consultas/consultas.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    InicioComponent,
    ConsultasComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    ComponentesModule,
    FormulariosModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxWebstorageModule.forRoot(),
    NgbDropdownModule,
    RecaptchaV3Module,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthServices,
    Sesion,
    Encript,
    Constantes,
    Formatos,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LfW5vgUAAAAAFMhgbCPIkZHjH9tq95IYX4aIZSn'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
