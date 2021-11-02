import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ButtonsComponent } from './buttons.component';


const routes: Routes = [
  {
    path: '',
    component: ButtonsComponent,
    data : {
      title: 'Buttons'
    }
  }
];


@NgModule({
  declarations: [
    ButtonsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ButtonsModule { }
