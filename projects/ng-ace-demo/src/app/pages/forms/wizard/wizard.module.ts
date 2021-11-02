import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ArchwizardModule } from 'angular-archwizard';

import { NgAceAdminModule } from 'ng-ace-admin';

import { ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { FormWizardComponent } from './wizard.component';

import { ValidationComponent } from './validation-form/validation.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';

const routes: Routes = [
  {
    path: '',
    component: FormWizardComponent,
    data : {
      title: 'Wizard & Validation'
    }
  }
];


@NgModule({
  declarations: [
    FormWizardComponent,
    ValidationComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component
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
