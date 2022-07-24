import { AuthGuard } from './../../../core/guard/auth.guard';
import { SBRouteData } from './../../../core/models/navigation.model';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '../../layout/base/base.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard - GIEP',
        },
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      },
     /* {
        path: 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        loadChildren: () => import('./views/pages/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'form-elements',
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      },*/
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
