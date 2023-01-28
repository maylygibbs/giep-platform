import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonsListAuthtoritationsResolver, CommonsListComponentTypesResolver, CommonsListRolesResolver } from '../../../core/resolvers/commons.resolver';
import { AppsComponent } from './components/apps/apps.component';

const routes: Routes = [
  {
    path:'apps',
    component: AppsComponent,
    resolve:{
      componentTypes: CommonsListComponentTypesResolver,
      authoritations: CommonsListAuthtoritationsResolver,
      roles: CommonsListRolesResolver
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
