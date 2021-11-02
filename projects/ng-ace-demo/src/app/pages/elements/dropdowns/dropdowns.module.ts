import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { DropdownsComponent } from './dropdowns.component';


const routes: Routes = [
  {
    path: '',
    component: DropdownsComponent,
    data : {
      title: 'Dropdowns'
    }
  }
];


@NgModule({
  declarations: [
    DropdownsComponent
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
export class DropdownModule { }
