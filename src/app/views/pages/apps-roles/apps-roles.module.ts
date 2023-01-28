import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRolesRoutingModule } from './apps-roles-routing.module';
import { AppsComponent } from './components/apps/apps.component';
import { AppStoreComponent } from './components/app-store/app-store.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    AppsComponent,
    AppStoreComponent
  ],
  imports: [
    CommonModule,
    AppsRolesRoutingModule,
    SharedModule
  ]
})
export class AppsRolesModule { }
