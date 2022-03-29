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
import { CellCustomActiveComponent } from './common/cell-custom-active/cell-custom-active.component';
import { CellGrouplistComponent } from './common/cell-grouplist/cell-grouplist.component';
import { PackagehistoryComponent } from './pages/managecustomers/packagehistory/packagehistory.component';
import { CellCustomUserlistComponent } from './common/cell-custom-userlist/cell-custom-userlist.component';
import { CellCustomPackagelistComponent } from './common/cell-custom-packagelist/cell-custom-packagelist.component';
import { CellCustomOrganizationlistComponent } from './common/cell-custom-organizationlist/cell-custom-organizationlist.component';
import { NewsessionComponent } from './pages/managesession/newsession/newsession.component';
import { SessionlistComponent } from './pages/managesession/sessionlist/sessionlist.component';
import { CellCustomCustomerslistComponent } from './common/cell-custom-customerslist/cell-custom-customerslist.component';
import { ManagerequestComponent } from './pages/managerequest/newrequest/managerequest.component';
import { RequestlistComponent } from './pages/managerequest/requestlist/requestlist.component';
import { CellCustomSessionlistComponent } from './common/cell-custom-sessionlist/cell-custom-sessionlist.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapTheme  from '@fullcalendar/bootstrap';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  bootstrapTheme
]);

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
    CellCustomActiveComponent,
    CellGrouplistComponent,
    PackagehistoryComponent,
    CellCustomUserlistComponent,
    CellCustomPackagelistComponent,
    CellCustomOrganizationlistComponent,
    NewsessionComponent,
    SessionlistComponent,
    CellCustomCustomerslistComponent,
    ManagerequestComponent,
    RequestlistComponent,
    CellCustomSessionlistComponent
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
    MatPaginatorModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
