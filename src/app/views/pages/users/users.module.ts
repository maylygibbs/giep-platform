import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from '../../shared/shared.module';
import { UserStoreComponent } from './components/user-store/user-store.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EmailAccountsComponent } from './components/email-accounts/email-accounts.component';
import { EmailAccountStoreComponent } from './components/email-account-store/email-account-store.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    UsersComponent,
    UserStoreComponent,
    ProfileComponent,
    EmailAccountsComponent,
    EmailAccountStoreComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ImageCropperModule,
    AngularEditorModule
  ]
})
export class UsersModule { }
