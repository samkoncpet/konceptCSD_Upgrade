import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ArchwizardModule } from 'angular-archwizard';

import { NgAceAdminModule } from 'ng-ace-admin';

import { NgxMaskModule } from 'ngx-mask';

import { FormWizardComponent } from './wizard.component';

import { ValidationComponent } from './validation-form/validation.component';

const routes: Routes = [
  {
    path: '',
    component: FormWizardComponent,
    data : {
      title: 'Customer'
    }
  }
];


@NgModule({
  declarations: [
    FormWizardComponent,
    ValidationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    NgbModule,
    NgAceAdminModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),

    ArchwizardModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FormWizardModule { }
