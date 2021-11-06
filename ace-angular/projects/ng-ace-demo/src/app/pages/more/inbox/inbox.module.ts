import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { JoditAngularModule } from 'jodit-angular';

import { ModalModule } from 'ngx-bootstrap/modal';

import { NgAceAdminModule } from 'ng-ace-admin';




import { InboxComponent } from './inbox.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ActionButtonsComponent } from './toolbar/action-buttons.component';
import { MessagesComponent } from './messages/messages.component';
import { FooterComponent } from './footer/footer.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { ComposeComponent } from './compose/compose.component';

const routes: Routes = [
  {
    path: '',
    component: InboxComponent,
    data : {
      title: 'Inbox'
    }
  }
];


@NgModule({
  declarations: [
    InboxComponent,
    SideMenuComponent,
    ToolbarComponent, ActionButtonsComponent,
    MessagesComponent,
    FooterComponent,
    MessageDetailComponent,
    ComposeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    NgbModule,
    ModalModule.forRoot(),

    JoditAngularModule,

    NgAceAdminModule,
    
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class InboxModule { }
