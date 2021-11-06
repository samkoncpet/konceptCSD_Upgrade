import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { NgAceAdminModule } from 'ng-ace-admin';




import { ErrorComponent } from './error.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorComponent,
    data : {
      title: 'Error'
    }
  }
];


@NgModule({
  declarations: [
    ErrorComponent
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
export class ErrorModule { }
