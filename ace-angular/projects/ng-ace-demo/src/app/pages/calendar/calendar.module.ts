import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgAceAdminModule } from 'ng-ace-admin';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapTheme  from '@fullcalendar/bootstrap';


import { CalendarComponent } from './calendar.component';


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
    component: CalendarComponent,
    data : {  
      title: 'FullCalendar'
    }
  }
];


@NgModule({
  declarations: [
    CalendarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,

    NgAceAdminModule,
    FullCalendarModule,
  
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CalendarModule { }
