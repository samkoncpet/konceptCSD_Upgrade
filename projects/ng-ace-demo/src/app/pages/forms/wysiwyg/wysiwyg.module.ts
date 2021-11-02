import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JoditAngularModule } from 'jodit-angular';

import { NgAceAdminModule } from 'ng-ace-admin';


import { WysiwygComponent } from './wysiwyg.component';


const routes: Routes = [
  {
    path: '',
    component: WysiwygComponent,
    data : {
      title: 'Wysiwyg and Markdown'
    }
  }
];


@NgModule({
  declarations: [
    WysiwygComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    NgbModule,
    NgAceAdminModule,

    JoditAngularModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WysiwygModule { }
