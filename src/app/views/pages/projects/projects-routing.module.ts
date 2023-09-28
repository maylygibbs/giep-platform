
import { CommonsListCountriesResolver, CommonsListRolesResolver, CommonsListStatusResolver } from '../../../core/resolvers/commons.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';
import { GetAllUserResolver } from '../../../core/resolvers/user.resolver';
import { GetAllCompanyResolver } from '../../../core/resolvers/company.resolver';
import { BoardDndComponent } from './components/board-dnd/board-dnd.component';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { MembersComponent } from './components/members/members.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {
    path:'',
    component:ProjectsComponent,
    data:{
      title: 'Proyectos - GIEP',
    },
    resolve:{
      Companies: GetAllCompanyResolver
    }
  },
  {
    path:'dashboard',
    component: ProjectDashboardComponent,
    children:[
      {
        path:'board',
        component: BoardDndComponent
      },
      {
        path:'members',
        component: MembersComponent,
        resolve:{
          users: GetAllUserResolver,
        }
      },
      {
        path:'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
