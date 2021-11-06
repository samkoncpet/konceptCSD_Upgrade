import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';

import { LoadingBarModule } from '@ngx-loading-bar/core';

import { MainLayoutModule } from './layouts/main/main.module';
import { LoginLayoutModule } from './layouts/login/login.module';

import { AppComponent } from './app.component';

import { MainLayoutComponent } from './layouts/main/main.component';
import { LoginLayoutComponent } from './layouts/login/login.component';
import { NewuserComponent } from './pages/manageusers/newuser/newuser.component';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    NewuserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,

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
