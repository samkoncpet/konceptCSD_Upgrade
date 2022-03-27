import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { TooltipsComponent } from './tooltips.component';


const routes: Routes = [
  {
    path: '',
    component: TooltipsComponent,
    data : {
      title: 'Tooltips and Popovers'
    }
  }
];


@NgModule({
  declarations: [
    TooltipsComponent
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
export class TooltipsModule { }
