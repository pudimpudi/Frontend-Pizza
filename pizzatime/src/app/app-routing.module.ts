import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadAllComponent } from './components/read-all/read-all.component';
import { UsuarioReadComponent } from './components/usuario-read/usuario-read.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'produtos', component: ReadAllComponent, canActivate: [AuthGuard] },
  { path: 'funcionarios', component: UsuarioReadComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/produtos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }