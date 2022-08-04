import { ProfileComponent } from './components/profile/profile.component';

import { CommonsListPositionsResolver, CommonsListRolesResolver } from './../../../core/resolvers/commons.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonsListDependencesResolver } from '../../../core/resolvers/commons.resolver';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path:'',
    component:UsersComponent,
    data:{
      title: 'Usuarios - GIEP',
    },
    resolve:{
      dependences: CommonsListDependencesResolver,
      positions: CommonsListPositionsResolver,
      roles: CommonsListRolesResolver
    }
  },
  {
    path:'profile',
    component:ProfileComponent,
    data:{
      title: 'Mi perfil - GIEP',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
