import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ArchwizardModule } from 'angular-archwizard';

import { NgAceAdminModule } from 'ng-ace-admin';

import { NgxMaskModule } from 'ngx-mask';

import { BooksessionComponent } from './booksession.component';

/* Full Calendar */
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapTheme  from '@fullcalendar/bootstrap';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  bootstrapTheme
]);

const routes: Routes = [
  {
    path: '',
    component: BooksessionComponent,
    data : {
      title: 'Session'
    }
  }
];


@NgModule({
  declarations: [
    BooksessionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    NgbModule,
    NgAceAdminModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FullCalendarModule,

    ArchwizardModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BookSessionWizardModule { }
