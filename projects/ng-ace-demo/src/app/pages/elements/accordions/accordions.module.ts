import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { AccordionsComponent } from './accordions.component';


const routes: Routes = [
  {
    path: '',
    component: AccordionsComponent,
    data : {
      title: 'Accordions'
    }
  }
];


@NgModule({
  declarations: [
    AccordionsComponent
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
export class AccordionsModule { }
