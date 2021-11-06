import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layouts/main/main.component';
import { LoginLayoutComponent } from './layouts/login/login.component';


const routes: Routes = [
  
  {
    path: 'login',
    component: LoginLayoutComponent,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/more/login/login.module').then((m) => m.LoginPageModule)
      }
    ]
  },
  {
    path: 'index',
    component: LoginLayoutComponent,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/more/login/login.module').then((m) => m.LoginPageModule)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    data: {
      title: 'Main'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },

      {
        path: 'cards',
        loadChildren: () => import('./pages/cards/cards.module').then((m) => m.CardsModule)
      },

      {
        path: 'calendar',
        loadChildren: () => import('./pages/calendar/calendar.module').then((m) => m.CalendarModule)
      },

      {
        path: 'more',
        loadChildren: () => import('./pages/more/more.module').then((m) => m.MoreModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
