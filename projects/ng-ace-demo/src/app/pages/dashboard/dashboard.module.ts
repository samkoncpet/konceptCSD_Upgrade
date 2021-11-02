import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';


import { DashboardComponent } from './dashboard.component';
import { InfoboxComponent, InfoboxComponent2, InfoboxLineChartComponent, InfoboxPieChartComponent } from './infobox/infobox.component';
import { TrafficChartComponent } from './traffic-chart/traffic-chart.component';

import { ProductsComponent } from './products/products.component';
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { TransfersComponent } from './transfers/transfers.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ConversationComponent } from './conversation/conversation.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data : {  
      title: 'Dashboard'
    }
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    InfoboxComponent,
    InfoboxComponent2,
    InfoboxLineChartComponent,
    InfoboxPieChartComponent,
    TrafficChartComponent,


    ProductsComponent,

    SalesChartComponent,

    TransfersComponent,

    TodoListComponent,

    ConversationComponent
  ],
  imports: [
    CommonModule,
    NgbModule,

    NgAceAdminModule,
  
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
