import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SubmenuDeactivate } from '../../_providers/submenu-deactivate.provider';


const routes: Routes = [
  {
    path: '',
    canActivate: [ SubmenuDeactivate ] // it's the "/elements" route (link) and is only used to toggle the submenu, so no component should get loaded
  },

  {
    path: 'buttons',
    loadChildren: () => import('./buttons/buttons.module').then((m) => m.ButtonsModule)
  },

  {
    path: 'button-groups',
    loadChildren: () => import('./button-groups/button-groups.module').then((m) => m.ButtonGroupsModule)
  },

  {
    path: 'alerts',
    loadChildren: () => import('./alerts/alerts.module').then((m) => m.AlertsModule)
  },

  {
    path: 'modals',
    loadChildren: () => import('./modals/modals.module').then((m) => m.ModalsModule)
  },

  {
    path: 'asides',
    loadChildren: () => import('./asides/asides.module').then((m) => m.AsidesModule)
  },

  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsModule)
  },

  {
    path: 'accordions',
    loadChildren: () => import('./accordions/accordions.module').then((m) => m.AccordionsModule)
  },

  {
    path: 'tooltips',
    loadChildren: () => import('./tooltips/tooltips.module').then((m) => m.TooltipsModule)
  },

  {
    path: 'badges',
    loadChildren: () => import('./badges/badges.module').then((m) => m.BadgesModule)
  },

  {
    path: 'pagination',
    loadChildren: () => import('./pagination/pagination.module').then((m) => m.PaginationModule)
  },

  {
    path: 'dropdowns',
    loadChildren: () => import('./dropdowns/dropdowns.module').then((m) => m.DropdownModule)
  },

  {
    path: 'icons',
    loadChildren: () => import('./icons/icons.module').then((m) => m.IconsModule)
  },

  {
    path: 'typography',
    loadChildren: () => import('./typography/typopgrahy.module').then((m) => m.TypographyModule)
  },

  {
    path: 'treeview',
    loadChildren: () => import('./treeview/treeview.module').then((m) => m.TreeviewPageModule)
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
export class ElementsModule { }

