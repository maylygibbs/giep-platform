import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonsListAuthtoritationsResolver, CommonsListComponentTypesResolver, CommonsListOptionsMenuResolver, CommonsListRolesResolver } from '../../../core/resolvers/commons.resolver';
import { AppsComponent } from './components/apps/apps.component';

const routes: Routes = [
  {
    path:'apps',
    component: AppsComponent,
    resolve:{
      componentTypes: CommonsListComponentTypesResolver,
      authoritations: CommonsListAuthtoritationsResolver,
      roles: CommonsListRolesResolver,
      menuItems: CommonsListOptionsMenuResolver
    },
    data: {
      title: 'Apps y Permissions - GIEp',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRolesRoutingModule { }
