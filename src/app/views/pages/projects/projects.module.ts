import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { SharedModule } from '../../shared/shared.module';
import { ProjectStoreComponent } from './components/project-store/project-store.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectStoreComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule { }
