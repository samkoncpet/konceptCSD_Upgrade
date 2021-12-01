import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { Ng2SmartTableModule } from 'ng2-smart-table';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { DynamicTableComponent } from './dynamic-table.component';


const routes: Routes = [
  {
    path: '',
    component: DynamicTableComponent,
    data : {
      title: 'ng2 Smart Table'
    }
  }
];


@NgModule({
  declarations: [
    DynamicTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    NgbModule,

    Ng2SmartTableModule,

    NgAceAdminModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DynamicTableModule { }
