import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { BadgesComponent } from './badges.component';


const routes: Routes = [
  {
    path: '',
    component: BadgesComponent,
    data : {
      title: 'Badges'
    }
  }
];


@NgModule({
  declarations: [
    BadgesComponent
  ],
  imports: [
    CommonModule,
    NgbModule,

    NgAceAdminModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BadgesModule { }
