import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SubmenuDeactivate } from '../../_providers/submenu-deactivate.provider';


const routes: Routes = [
  {
    path: '',
    canActivate: [ SubmenuDeactivate ] // it's the "/forms" route (link) and is only used to toggle the submenu, so no component should get loaded
  },

  {
    path: 'basic',
    loadChildren: () => import('./basic/basic.module').then((m) => m.BasicFormsModule)
  },

  {
    path: 'more',
    loadChildren: () => import('./more/more.module').then((m) => m.MoreFormsModule)
  },

  {
    path: 'wizard',
    loadChildren: () => import('./wizard/wizard.module').then((m) => m.FormWizardModule)
  },

  {
    path: 'upload',
    loadChildren: () => import('./upload/file-upload.module').then((m) => m.FileUploadModule)
  },

  {
    path: 'wysiwyg',
    loadChildren: () => import('./wysiwyg/wysiwyg.module').then((m) => m.WysiwygModule)
  }
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    RouterModule.forChild(routes)
  ],

  providers: [
    SubmenuDeactivate
  ],

  exports: [
    RouterModule
  ]
})
export class FormsModule { }

