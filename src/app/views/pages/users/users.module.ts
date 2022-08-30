import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../../shared/shared.module';
import { UserStoreComponent } from './components/user-store/user-store.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    UsersComponent,
    UserStoreComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ImageCropperModule
  ]
})
export class UsersModule { }
