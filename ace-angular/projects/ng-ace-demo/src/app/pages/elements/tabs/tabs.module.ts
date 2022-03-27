import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { TabsComponent } from './tabs.component';


const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    data : {
      title: 'Tabs'
    }
  }
];


@NgModule({
  declarations: [
    TabsComponent
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
export class TabsModule { }
