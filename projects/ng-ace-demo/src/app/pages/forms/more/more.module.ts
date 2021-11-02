import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';


import { NgAceAdminModule } from 'ng-ace-admin';


import { MoreFormsComponent } from './more.component';


const routes: Routes = [
  {
    path: '',
    component: MoreFormsComponent,
    data : {
      title: 'More Form Elements'
    }
  }
];


@NgModule({
  declarations: [
    MoreFormsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    NgbModule,
    NgAceAdminModule,

    NgSelectModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MoreFormsModule { }
