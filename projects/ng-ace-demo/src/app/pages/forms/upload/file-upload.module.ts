import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { NgAceAdminModule } from 'ng-ace-admin';


import { FileUploadComponent } from './file-upload.component';


const routes: Routes = [
  {
    path: '',
    component: FileUploadComponent,
    data : {
      title: 'File Upload'
    }
  }
];


@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    NgbModule,
    NgAceAdminModule,

    DropzoneModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FileUploadModule { }
