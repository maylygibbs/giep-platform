import { GetMenuOptions } from './../../../core/resolvers/user.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../../../core/guard/auth.guard';
import { BaseComponent } from '../../layout/base/base.component';
import { NotificationResolver } from '../../../core/resolvers/notification.resolver';

const routes: Routes = [
  { path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    resolve:{
      options: GetMenuOptions,
      notifications: NotificationResolver
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'projects',
        loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'apps',
        loadChildren: () => import('../apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        loadChildren: () => import('../ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        loadChildren: () => import('../advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'form-elements',
        loadChildren: () => import('../form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () => import('../advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        loadChildren: () => import('../charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('../tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('../icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        loadChildren: () => import('../general/general.module').then(m => m.GeneralModule)
      },
      {
        path: 'capture-instruments',
        loadChildren: () => import('../capture-instruments/capture-instruments.module').then(m => m.CaptureInstrumentsModule),
      },
      {
        path: 'giep-repository',
        loadChildren: () => import('../giep-repository/giep-repository.module').then(m => m.GiepRepositoryModule),
      },
      {
        path: 'roles-permissions',
        loadChildren: () => import('../roles-permissions/roles-permissions.module').then(m => m.RolesPermissionsModule),
      },
      {
        path: 'apps-permissions',
        loadChildren: () => import('../apps-roles/apps-roles.module').then(m => m.AppsRolesModule),
      },
      {
        path: 'authorizations',
        loadChildren: () => import('../authorizations/authorizations.module').then(m => m.AuthorizationsModule),
      },
      {
        path: 'notifications',
        loadChildren: () => import('../notification/notification.module').then(m => m.NotificationModule),
      },
      {
        path: 'accreditations',
        loadChildren: () => import('../accreditation/accreditation.module').then(m => m.AccreditationModule),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
