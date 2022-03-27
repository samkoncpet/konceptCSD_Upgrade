import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { PaginationComponent } from './pagination.component';


const routes: Routes = [
  {
    path: '',
    component: PaginationComponent,
    data : {
      title: 'Pagination'
    }
  }
];


@NgModule({
  declarations: [
    PaginationComponent
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
export class PaginationModule { }
