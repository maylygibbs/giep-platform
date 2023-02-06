import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonsListAuthtoritationsResolver, CommonsListModulesResolver, CommonsListOptionsMenuResolver, CommonsListRolesResolver } from '../../../core/resolvers/commons.resolver';
import { AuthorizationsComponent } from './components/authorizations/authorizations.component';

const routes: Routes = [
  {
    path:'',
    component: AuthorizationsComponent,
    resolve:{
      authoritations: CommonsListAuthtoritationsResolver,
      roles: CommonsListRolesResolver,
      modulesItems: CommonsListModulesResolver
    },
    data: {
      title: 'Autorizaciones - GIEp',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationsRoutingModule { }
