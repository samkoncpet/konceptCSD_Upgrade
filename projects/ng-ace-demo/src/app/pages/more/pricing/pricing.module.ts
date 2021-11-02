import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { NgAceAdminModule } from 'ng-ace-admin';




import { PricingComponent } from './pricing.component';
import { Pricing1Component } from './pricing1/pricing1.component';
import { Pricing2Component } from './pricing2/pricing2.component';
import { Pricing3Component } from './pricing3/pricing3.component';

const routes: Routes = [
  {
    path: '',
    component: PricingComponent,
    data : {
      title: 'Pricing'
    }
  }
];


@NgModule({
  declarations: [
    PricingComponent,
    Pricing1Component,
    Pricing2Component,
    Pricing3Component
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
export class PricingModule { }
