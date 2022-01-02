import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layouts/main/main.component';
import { LoginLayoutComponent } from './layouts/login/login.component';
import { UserlistComponent } from './pages/manageusers/userlist/userlist.component';
import { NewuserComponent } from './pages/manageusers/newuser/newuser.component';
import { UsertypeComponent } from './pages/manageusers/usertype/usertype.component';
import { CustomerslistComponent } from './pages/managecustomers/customerslist/customerslist.component';
import { NewcustomersComponent } from './pages/managecustomers/newcustomers/newcustomers.component';
import { PackagelistComponent } from './pages/managepackage/packagelist/packagelist.component';
import { NewpackageComponent } from './pages/managepackage/newpackage/newpackage.component';
import { GrouplistComponent } from './pages/managegroup/grouplist/grouplist.component';
import { NewgroupComponent } from './pages/managegroup/newgroup/newgroup.component';
import { OrganizationlistComponent } from './pages/manageorganization/organizationlist/organizationlist.component';
import { NeworganizationComponent } from './pages/manageorganization/neworganization/neworganization.component';


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
        path: 'user/list',
        component: UserlistComponent,
        data: {
          title: 'User list'
        }
      },
      {
        path: 'user/add',
        component: NewuserComponent,
        data: {
          title: 'Add new user'
        }
      },
      {
        path: 'user/:type/:id',
        component: NewuserComponent,
        data: {
          title: 'User'
        }
      },
      {
        path: 'customer/list',
        component: CustomerslistComponent,
        data: {
          title: 'Customer list'
        }
      },
      {
        path: 'customer/update/:id',
        component: NewcustomersComponent,
        data: {
          title: 'Update Customer'
        }
      },
      {
        path: 'addusertype',
        component: UsertypeComponent,
        data: {
          title: 'Add user type'
        }
      },
      {
        path: 'package/list',
        component: PackagelistComponent,
        data: {
          title: 'Package list'
        }
      },
      {
        path: 'package/add',
        component: NewpackageComponent,
        data: {
          title: 'Add Package'
        }
      },
      {
        path: 'package/:type/:id',
        component: NewpackageComponent,
        data: {
          title: 'Package'
        }
      },
      {
        path: 'group/add',
        component: NewgroupComponent,
        data: {
          title: 'Add Group'
        }
      },
      {
        path: 'group/list',
        component: GrouplistComponent,
        data: {
          title: 'Group list'
        }
      },
      {
        path: 'group/:type/:id',
        component: NewgroupComponent,
        data: {
          title: 'Group'
        }
      },
      {
        path: 'organization/list',
        component: OrganizationlistComponent,
        data: {
          title: 'Organization list'
        }
      },
      {
        path: 'organization/add',
        component: NeworganizationComponent,
        data: {
          title: 'Add Organization'
        }
      },
      {
        path: 'organization/:type/:id',
        component: NeworganizationComponent,
        data: {
          title: 'Update Organization'
        }
      },
      {
        path: 'vieworganization/:type/:id',
        component: NeworganizationComponent,
        data: {
          title: 'View Organization'
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
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/more/profile/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./pages/tables/tables.module').then((m) => m.TablesModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./pages/forms/forms.module').then((m) => m.FormsModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./pages/forms/forms.module').then((m) => m.FormsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
