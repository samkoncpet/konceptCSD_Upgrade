import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ButtonGroupsComponent } from './button-groups.component';


const routes: Routes = [
  {
    path: '',
    component: ButtonGroupsComponent,
    data : {
      title: 'Button Groups'
    }
  }
];


@NgModule({
  declarations: [
    ButtonGroupsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    NgbModule,
    
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ButtonGroupsModule { }
