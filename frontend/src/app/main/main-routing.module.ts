import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from '../componentes/nav/nav.component';
import { MainComponent } from './main.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', component: NavComponent, children: [
    { path: 'inicio', component: MainComponent },
    { path: 'configuracion',  redirectTo: 'configuracion/perfil'},
    { path: 'perfil', component: PerfilComponent },
    { path: '**', redirectTo: 'inicio', pathMatch: 'full' }
  ]},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
