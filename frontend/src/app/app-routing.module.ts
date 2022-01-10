import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { HomeGuard } from './_guards/home.guard';

import { NavComponent } from './componentes/nav/nav.component';
import { LogoutComponent } from './componentes/logout/logout.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { ConsultasComponent } from './paginas/consultas/consultas.component';
import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterComponent } from './register/register.component';
import { ChangePassComponent } from './change-pass/change-pass.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./main/main.module').then(e => e.MainModule), canActivate: [AuthGuard] },
  {
    path: '', component: NavComponent, children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'consultas', component: ConsultasComponent },
      { path: 'chage-pass', component: ChangePassComponent },
      { path: 'recovery', component: RecoveryComponent },
      { path: 'login', component: LoginComponent, canActivate: [HomeGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [HomeGuard] },
      { path: 'logout', component: LogoutComponent },
      { path: '**', redirectTo: 'inicio' }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
