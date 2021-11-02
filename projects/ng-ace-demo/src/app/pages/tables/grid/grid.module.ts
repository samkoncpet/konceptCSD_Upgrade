import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { GridComponent } from './grid.component';


const routes: Routes = [
  {
    path: '',
    component: GridComponent,
    data : {
      title: 'AG Grid'
    }
  }
];


@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    NgbModule,
    AgGridModule.withComponents([]),

    NgAceAdminModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GridModule { }
