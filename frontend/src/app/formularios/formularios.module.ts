import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BlockUIModule } from 'ng-block-ui';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginFormComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
const components = [
  LoginFormComponent,
  RegisterComponent,
  RecoveryComponent,
];
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    BlockUIModule.forRoot(),
    HttpClientModule,
    NgbModule,
    NgxWebstorageModule.forRoot(),
    NgbDropdownModule,
    RouterModule,
    SimpleNotificationsModule.forRoot(),
  ],
  exports: components
})
export class FormulariosModule { }
