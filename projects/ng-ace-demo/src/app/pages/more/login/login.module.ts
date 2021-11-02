import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { NgAceAdminModule } from 'ng-ace-admin';

import { LoginComponent } from './login.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { IntroComponent } from './intro/intro.component';


const routes: Routes = [
  {
      path: '',
      component: LoginComponent
  },
];



@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent,
    SignupComponent,
    ForgotComponent,
    IntroComponent
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
export class LoginPageModule { }
