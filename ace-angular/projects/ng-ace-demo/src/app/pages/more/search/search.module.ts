import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';


import { ModalModule } from 'ngx-bootstrap/modal';

import { NgAceAdminModule } from 'ng-ace-admin';

import { SearchComponent } from './search.component';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { SponsoredResultsComponent } from './sponsored-results/sponsored-results.component';
import { ResultsComponent } from './results/results.component';




const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    data : {
      title: 'Search Results'
    }
  }
];


@NgModule({
  declarations: [
    SearchComponent, FilterMenuComponent, SponsoredResultsComponent, ResultsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    NgbModule,
    ModalModule.forRoot(),

    NgAceAdminModule,
    
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchModule { }
