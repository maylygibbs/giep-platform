import { ProfileComponent } from './components/profile/profile.component';

import { CommonsListCountriesResolver, CommonsListEmailAccountsTypeResolver, CommonsListPositionsResolver, CommonsListRolesResolver, CommonsListSocialNetworkResolver } from './../../../core/resolvers/commons.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonsListDependencesResolver } from '../../../core/resolvers/commons.resolver';
import { UsersComponent } from './components/users/users.component';
import { EmailAccountsComponent } from './components/email-accounts/email-accounts.component';

const routes: Routes = [
  {
    path:'',
    component:UsersComponent,
    data:{
      title: 'Usuarios - GIEp',
    },
    resolve:{
      dependences: CommonsListDependencesResolver,
      positions: CommonsListPositionsResolver,
      roles: CommonsListRolesResolver,
      countries: CommonsListCountriesResolver
    }
  },
  {
    path:'profile',
    component:ProfileComponent,
    data:{
      title: 'Mi perfil - GIEp',
    },
    resolve:{
      countries: CommonsListCountriesResolver,
      networks: CommonsListSocialNetworkResolver
    }
  },
  {
    path:'email-accounts',
    component:EmailAccountsComponent,
    data:{
      title: 'Cuentas de email - GIEp',
    },
    resolve:{
      accountsType: CommonsListEmailAccountsTypeResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
