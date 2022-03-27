import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';


import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NgAceAdminModule } from 'ng-ace-admin';



import { AsidesComponent } from './asides.component';
import { SupportDialogComponent } from './support-dialog/support-dialog.component';
import { ActivitiesComponent } from './activities/activities.component';


const routes: Routes = [
  {
    path: '',
    component: AsidesComponent,
    data : {
      title: 'Asides'
    }
  }
];


@NgModule({
  declarations: [
    AsidesComponent,
    SupportDialogComponent,
    ActivitiesComponent
  ],
  imports: [
    CommonModule,

    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),

    NgAceAdminModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AsidesModule { }
