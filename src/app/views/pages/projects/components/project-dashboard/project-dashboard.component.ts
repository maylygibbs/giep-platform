import { Component, OnInit } from '@angular/core';
import { Project } from '../../../../../core/models/project';
import { ProjectService } from '../../../../../core/services/project.service';


@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  selectedItem: Project;

  constructor(private projectService: ProjectService) { }

  async ngOnInit() {
    const id = +localStorage.getItem('projectidselect');
    this.selectedItem = await this.projectService.getProjectById(id);
  }

}
