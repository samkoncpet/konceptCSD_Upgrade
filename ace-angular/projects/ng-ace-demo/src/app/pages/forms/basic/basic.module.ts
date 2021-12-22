import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NumberPickerModule } from 'ng-number-picker';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ColorPickerModule } from 'ngx-color-picker';

import { NgAceAdminModule } from 'ng-ace-admin';


import { BasicFormsCompontent } from './basic.component';


const routes: Routes = [
  {
    path: '',
    component: BasicFormsCompontent,
    data : {
      title: 'Basic Forms'
    }
  }
];


@NgModule({
  declarations: [
    BasicFormsCompontent
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    NgbModule,
    TextareaAutosizeModule,
    NgxMaskModule.forRoot(),
    NgxSliderModule,
    NumberPickerModule,

    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),

    ColorPickerModule,

    NgAceAdminModule,

    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class BasicFormsModule { }
