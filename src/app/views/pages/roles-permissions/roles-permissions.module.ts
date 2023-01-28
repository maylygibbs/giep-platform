import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesPermissionsRoutingModule } from './roles-permissions-routing.module';
import { RolesComponent } from './components/roles/roles.component';
import { RolStoreComponent } from './components/rol-store/rol-store.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    RolesComponent,
    RolStoreComponent
  ],
  imports: [
    CommonModule,
    RolesPermissionsRoutingModule,
    SharedModule
  ]
})
export class RolesPermissionsModule { }
