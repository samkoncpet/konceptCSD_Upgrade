import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';

import { NgAceAdminModule } from 'ng-ace-admin';
import { TreeviewModule } from 'ngx-treeview';

import { TreeviewComponentDemo } from './treeview.component';
import { CategoryTreeComponent } from './category-tree/category-tree.component';
import { FileTreeComponent } from './file-tree/file-tree.component';


const routes: Routes = [
  {
    path: '',
    component: TreeviewComponentDemo,
    data : {
      title: 'Treeview'
    }
  }
];


@NgModule({
  declarations: [
    TreeviewComponentDemo,
    CategoryTreeComponent,
    FileTreeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    NgAceAdminModule,
    TreeviewModule.forRoot(),

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TreeviewPageModule { }
