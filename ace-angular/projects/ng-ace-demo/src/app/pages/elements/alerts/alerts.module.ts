import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


import { NgAceAdminModule } from 'ng-ace-admin';


import { AlertsComponent } from './alerts.component';
import { ToastExamplesComponent } from './toast-examples/toast-examples.component';
import { AlertExamplesComponent } from './alert-examples/alert-examples.component';
import { SweetalertExamplesComponent } from './sweetalert-examples/sweetalert-examples.component';

const routes: Routes = [
  {
    path: '',
    component: AlertsComponent,
    data : {
      title: 'Toasts & Alerts'
    }
  }
];


@NgModule({
  declarations: [
    AlertsComponent,
    ToastExamplesComponent,
    AlertExamplesComponent,
    SweetalertExamplesComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgAceAdminModule,

    SweetAlert2Module.forRoot(),

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AlertsModule { }
