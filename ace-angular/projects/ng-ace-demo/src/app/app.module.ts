import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule} from '@angular/material/paginator'

import { NgAceAdminModule } from 'ng-ace-admin';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';

import { LoadingBarModule } from '@ngx-loading-bar/core';

import { MainLayoutModule } from './layouts/main/main.module';
import { LoginLayoutModule } from './layouts/login/login.module';

import { AppComponent } from './app.component';

import { MainLayoutComponent } from './layouts/main/main.component';
import { LoginLayoutComponent } from './layouts/login/login.component';
import { NewuserComponent } from './pages/manageusers/newuser/newuser.component';
import { UserlistComponent } from './pages/manageusers/userlist/userlist.component';
import { NewcustomersComponent } from './pages/managecustomers/newcustomers/newcustomers.component';
import { CustomerslistComponent } from './pages/managecustomers/customerslist/customerslist.component';
import { PackagelistComponent } from './pages/managepackage/packagelist/packagelist.component';
import { NewpackageComponent } from './pages/managepackage/newpackage/newpackage.component';
import { UsertypeComponent } from './pages/manageusers/usertype/usertype.component';
import { NewgroupComponent } from './pages/managegroup/newgroup/newgroup.component';
import { GrouplistComponent } from './pages/managegroup/grouplist/grouplist.component';
import { NeworganizationComponent } from './pages/manageorganization/neworganization/neworganization.component';
import { OrganizationlistComponent } from './pages/manageorganization/organizationlist/organizationlist.component';
import { CellCustomComponent } from './common/cell-custom/cell-custom.component';
import { CellCustomActiveComponent } from './common/cell-custom-active/cell-custom-active.component';
import { CellGrouplistComponent } from './common/cell-grouplist/cell-grouplist.component';



@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    NewuserComponent,
    UserlistComponent,
    NewcustomersComponent,
    CustomerslistComponent,
    PackagelistComponent,
    NewpackageComponent,
    UsertypeComponent,
    NewgroupComponent,
    GrouplistComponent,
    NeworganizationComponent,
    OrganizationlistComponent,
    CellCustomComponent,
    CellCustomActiveComponent,
    CellGrouplistComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,

    BrowserAnimationsModule,
    LoadingBarModule,
    AgGridModule.withComponents([AppComponent]),

    NgAceAdminModule,
    
    MainLayoutModule,
    LoginLayoutModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    MatPaginatorModule
  ],
  providers: [],
  entryComponents: [CellCustomComponent],
  bootstrap: [AppComponent,]
})
export class AppModule { }
