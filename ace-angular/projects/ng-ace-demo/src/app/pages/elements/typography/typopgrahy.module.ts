import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { NgAceAdminModule } from 'ng-ace-admin';


import { TypographyComponent } from './typography.component';


const routes: Routes = [
  {
    path: '',
    component: TypographyComponent,
    data : {
      title: 'Typography'
    }
  }
];


@NgModule({
  declarations: [
    TypographyComponent
  ],
  imports: [
    CommonModule,

    NgAceAdminModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TypographyModule { }
