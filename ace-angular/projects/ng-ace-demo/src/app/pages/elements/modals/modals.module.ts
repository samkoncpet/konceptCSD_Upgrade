import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';


import { NgAceAdminModule } from 'ng-ace-admin';


import { ModalsComponent } from './modals.component';


const routes: Routes = [
  {
    path: '',
    component: ModalsComponent,
    data : {
      title: 'Modals'
    }
  }
];


@NgModule({
  declarations: [
    ModalsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgAceAdminModule,

    ModalModule.forRoot(),

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ModalsModule { }
