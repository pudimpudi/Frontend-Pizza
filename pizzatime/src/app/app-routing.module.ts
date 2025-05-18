import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadAllComponent } from './components/read-all/read-all.component';
import { UsuarioReadComponent } from './components/usuario-read/usuario-read.component';


const routes: Routes = [
  { path: '', component: ReadAllComponent },
  { path: 'produtos', component: ReadAllComponent },
  { path: 'funcionarios', component: UsuarioReadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }