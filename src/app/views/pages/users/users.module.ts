import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../../shared/shared.module';
import { UserStoreComponent } from './components/user-store/user-store.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserStoreComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
