import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationsRoutingModule } from './authorizations-routing.module';
import { AuthorizationsComponent } from './components/authorizations/authorizations.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthorizationStoreComponent } from './components/authorization-store/authorization-store.component';


@NgModule({
  declarations: [
    AuthorizationsComponent,
    AuthorizationStoreComponent
  ],
  imports: [
    CommonModule,
    AuthorizationsRoutingModule,
    SharedModule
  ]
})
export class AuthorizationsModule { }
