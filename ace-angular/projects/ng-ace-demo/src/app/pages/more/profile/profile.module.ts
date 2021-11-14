import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { NgAceAdminModule } from 'ng-ace-admin';




import { ProfileComponent } from './profile.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { OverviewComponent } from './overview/overview.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ActivityComponent } from './activity/activity.component';
import { EditComponent } from './edit/edit.component';;

import { LocalstorageService } from '../../../config/localstorage.service';
import { AppsettingsService } from '../../../config/appsettings.service';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data : {
      title: 'Profile'
    }
  }
];


@NgModule({
  declarations: [
    ProfileComponent,
    LeftSideComponent,
    OverviewComponent,
    TimelineComponent,
    ActivityComponent,
    EditComponent
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
export class ProfileModule { }
