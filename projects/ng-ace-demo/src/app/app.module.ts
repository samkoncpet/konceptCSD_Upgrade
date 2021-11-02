import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';

import { LoadingBarModule } from '@ngx-loading-bar/core';

import { MainLayoutModule } from './layouts/main/main.module';
import { LoginLayoutModule } from './layouts/login/login.module';

import { AppComponent } from './app.component';

import { MainLayoutComponent } from './layouts/main/main.component';
import { LoginLayoutComponent } from './layouts/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,

    BrowserAnimationsModule,
    LoadingBarModule,

    NgAceAdminModule,
    
    MainLayoutModule,
    LoginLayoutModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
