import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {  PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ReadAllComponent } from './components/read-all/read-all.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioReadComponent } from './components/usuario-read/usuario-read.component';
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from 'ngx-mask';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { Header2Component } from './components/header2/header2.component';
import { ProdutocardComponent } from './components/produtocard/produtocard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReadAllComponent,
    FooterComponent,
    UsuarioReadComponent,
    LoginComponent,
    LandingPageComponent,
    Header2Component,
    ProdutocardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule,
    HttpClientModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideNgxMask(),
    { provide: 'LOCALSTORAGE', useFactory: (platformId: Object) => { 
      return isPlatformBrowser(platformId) ? window.localStorage : null;
    }, deps: [PLATFORM_ID] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
