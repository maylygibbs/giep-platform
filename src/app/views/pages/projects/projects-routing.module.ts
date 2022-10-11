
import { CommonsListCountriesResolver, CommonsListRolesResolver, CommonsListStatusResolver } from '../../../core/resolvers/commons.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { GetAllUserResolver } from '../../../core/resolvers/user.resolver';
import { GetAllCompanyResolver } from '../../../core/resolvers/company.resolver';

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
      users: GetAllUserResolver,
      Companies: GetAllCompanyResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
