import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layouts/main/main.component';
import { LoginLayoutComponent } from './layouts/login/login.component';
import { UserlistComponent } from './pages/manageusers/userlist/userlist.component';
import { NewuserComponent } from './pages/manageusers/newuser/newuser.component';
import { CustomerslistComponent } from './pages/managecustomers/customerslist/customerslist.component';
import { NewcustomersComponent } from './pages/managecustomers/newcustomers/newcustomers.component';
import { PackagelistComponent } from './pages/managepackage/packagelist/packagelist.component';
import { NewpackageComponent } from './pages/managepackage/newpackage/newpackage.component';


const routes: Routes = [
  {
    path: '',
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
        path: 'userlist',
        component: UserlistComponent,
        data: {
          title: 'User List'
        }
      },
      {
        path: 'addnewuser',
        component: NewuserComponent,
        data: {
          title: 'Add new user'
        }
      },
      {
        path: 'customerslist',
        component: CustomerslistComponent,
        data: {
          title: 'Customers list'
        }
      },
      {
        path: 'addcustomers',
        component: NewcustomersComponent,
        data: {
          title: 'Add Customer'
        }
      },
      {
        path: 'packagelist',
        component: PackagelistComponent,
        data: {
          title: 'Package list'
        }
      },
      {
        path: 'addpackage',
        component: NewpackageComponent,
        data: {
          title: 'Add Package'
        }
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
