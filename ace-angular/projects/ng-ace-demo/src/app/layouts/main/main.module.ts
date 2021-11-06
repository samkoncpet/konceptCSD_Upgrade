import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { SidebarComponent } from '../partials/sidebar/sidebar.component';
import { SidebarSubmenuComponent } from '../partials/sidebar/submenu.component';

import { NavbarComponent } from '../partials/navbar/navbar.component';
import { NavbarSearchComponent } from '../partials/navbar/navbar-search/navbar-search.component';
import { NavbarMegamenuComponent } from '../partials/navbar/navbar-megamenu/navbar-megamenu.component';
import { NavbarNotificationsComponent } from '../partials/navbar/navbar-notifications/navbar-notifications.component';
import { NavbarTasksComponent } from '../partials/navbar/navbar-tasks/navbar-tasks.component';

import { FooterComponent } from '../partials/footer/footer.component';


@NgModule({
  declarations: [
    SidebarComponent,
    SidebarSubmenuComponent,

    NavbarComponent,
    NavbarSearchComponent,
    NavbarMegamenuComponent,
    NavbarNotificationsComponent,
    NavbarTasksComponent,

    FooterComponent
  ],
  imports: [
    CommonModule,
    //AppRoutingModule,
    RouterModule,

    NgbModule,
    NgAceAdminModule
  ],
  exports: [ // make these accessible to AppModule
    SidebarComponent,
    SidebarSubmenuComponent,
    

    NavbarComponent,
    NavbarSearchComponent,
    NavbarMegamenuComponent,
    NavbarNotificationsComponent,

    FooterComponent
  ]
})
export class MainLayoutModule { }
