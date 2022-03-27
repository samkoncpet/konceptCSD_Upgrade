import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';


import { IconsComponent } from './icons.component';


const routes: Routes = [
  {
    path: '',
    component: IconsComponent,
    data : {
      title: 'Icons'
    }
  }
];


@NgModule({
  declarations: [
    IconsComponent
  ],
  imports: [
    CommonModule,
    
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class IconsModule { }
