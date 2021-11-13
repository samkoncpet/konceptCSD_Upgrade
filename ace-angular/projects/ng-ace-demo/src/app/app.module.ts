import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';
import { NgxSpinnerModule } from "ngx-spinner";

import { LoadingBarModule } from '@ngx-loading-bar/core';

import { MainLayoutModule } from './layouts/main/main.module';
import { LoginLayoutModule } from './layouts/login/login.module';

import { AppComponent } from './app.component';

import { MainLayoutComponent } from './layouts/main/main.component';
import { LoginLayoutComponent } from './layouts/login/login.component';
import { NewuserComponent } from './pages/manageusers/newuser/newuser.component';
import { NewcustomersComponent } from './pages/managecustomers/newcustomers/newcustomers.component';
import { CustomerslistComponent } from './pages/managecustomers/customerslist/customerslist.component';
import { PackagelistComponent } from './pages/managepackage/packagelist/packagelist.component';
import { NewpackageComponent } from './pages/managepackage/newpackage/newpackage.component';
import { UsertypeComponent } from './pages/manageusers/usertype/usertype.component';
import { NewgroupComponent } from './pages/managegroup/newgroup/newgroup.component';
import { GrouplistComponent } from './pages/managegroup/grouplist/grouplist.component';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    NewuserComponent,
    NewcustomersComponent,
    CustomerslistComponent,
    PackagelistComponent,
    NewpackageComponent,
    UsertypeComponent,
    NewgroupComponent,
    GrouplistComponent
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
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
