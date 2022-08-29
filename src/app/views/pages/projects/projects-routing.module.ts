
import { CommonsListCountriesResolver, CommonsListPositionsResolver, CommonsListRolesResolver, CommonsListStatusResolver } from '../../../core/resolvers/commons.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonsListDependencesResolver } from '../../../core/resolvers/commons.resolver';
import { ProjectsComponent } from './components/projects/projects.component';
import { GetAllUserResolver } from 'src/app/core/resolvers/user.resolver';

const routes: Routes = [
  {
    path:'',
    component:ProjectsComponent,
    data:{
      title: 'Proyectos - GIEP',
    },
    resolve:{
      statusList: CommonsListStatusResolver,
      countries: CommonsListCountriesResolver,
      users: GetAllUserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
