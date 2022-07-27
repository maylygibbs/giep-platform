import { CommonsListPositionsResolver } from './../../../core/resolvers/commons.resolver';
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
      positions: CommonsListPositionsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
