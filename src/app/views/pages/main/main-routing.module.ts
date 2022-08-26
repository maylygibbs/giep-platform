import { GetInfoUserResolver } from './../../../core/resolvers/user.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../../../core/guard/auth.guard';
import { BaseComponent } from '../../layout/base/base.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  { path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
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
        path: 'capture-instruments',
        loadChildren: () => import('../capture-instruments/capture-instruments.module').then(m => m.CaptureInstrumentsModule),
      },
      {
        path: 'results',
        loadChildren: () => import('../results/results.module').then(m => m.ResultsModule),
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
