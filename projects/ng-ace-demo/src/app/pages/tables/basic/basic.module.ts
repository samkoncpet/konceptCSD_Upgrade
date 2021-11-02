import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { BasicTablesCompontent } from './basic.component';


const routes: Routes = [
  {
    path: '',
    component: BasicTablesCompontent,
    data : {
      title: 'Basic Tables'
    }
  }
];


@NgModule({
  declarations: [
    BasicTablesCompontent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    NgbModule,

    NgAceAdminModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BasicTablesModule { }
