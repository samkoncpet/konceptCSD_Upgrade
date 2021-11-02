import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SubmenuDeactivate } from '../../_providers/submenu-deactivate.provider';


const routes: Routes = [
  {
    path: '',
    canActivate: [ SubmenuDeactivate ] // it's the "/tables" route (link) and is only used to toggle the submenu, so no component should get loaded
  },

  {
    path: 'basic',
    loadChildren: () => import('./basic/basic.module').then((m) => m.BasicTablesModule)
  },

  {
    path: 'dynamic',
    loadChildren: () => import('./dynamic/dynamic-table.module').then((m) => m.DynamicTableModule)
  },

  {
    path: 'grid',
    loadChildren: () => import('./grid/grid.module').then((m) => m.GridModule)
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
export class TablesModule { }

