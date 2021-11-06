import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SubmenuDeactivate } from '../../_providers/submenu-deactivate.provider';



const routes: Routes = [
  {
    path: '',
    canActivate: [ SubmenuDeactivate ] // it's the "/more" route (link) and is only used to toggle the submenu, so no component should get loaded
  },

  // we are not including "login" path here, because it has a different Layout Component. It's addressed in `app-routing.module.ts`

  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule)
  },

  {
    path: 'pricing',
    loadChildren: () => import('./pricing/pricing.module').then((m) => m.PricingModule)
  },

  {
    path: 'invoice',
    loadChildren: () => import('./invoice/invoice.module').then((m) => m.InvoiceModule)
  },

  {
    path: 'inbox',
    loadChildren: () => import('./inbox/inbox.module').then((m) => m.InboxModule)
  },

  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then((m) => m.SearchModule)
  },

  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then((m) => m.ErrorModule)
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
export class MoreModule { }

