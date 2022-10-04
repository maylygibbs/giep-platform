import { environment } from '../../../../../../environments/environment';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { Project } from '../../../../../core/models/project';
import { ProjectService } from '../../../../../core/services/project.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import * as _ from 'lodash';
import * as moment from 'moment';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent extends BaseComponent implements  OnInit {


  step:number = 1;
  projects: PaginationResponse;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;


  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;

  
  selectedItem: Project;
  word:string;



  constructor(private projectService: ProjectService) {
    super();
   }

  async ngOnInit() {
    this.projects = await this.projectService.getProjectsPaginated({ page: 1, rowByPage: 5, word: null });
  }

  async loadPage(pageInfo: any) {
    this.page = pageInfo;
    this.projects = null;
    this.projects = await this.projectService.getProjectsPaginated({ page: this.page, rowByPage: 5, word: this.word ? this.word : null});
  }

  create(){
    this.selectedItem = new Project();
    this.next();
  }

  

  async config(id: number) {
    this.selectedItem = await this.projectService.getProjectById(id);
    this.next();
  }

  async select(id: number) {
    this.selectedItem = await this.projectService.getProjectById(id);
    this.next();
  }

  async delete(id: number) {
    await this.projectService.deleteProject(id);
    this.loadPage(this.page);
  }

  next(){
    this.step++;
  }

  back(item:any){
    this.selectedItem = item;
    this.step--;
    this.loadPage(this.page);
  }

  search(){
    if (this.word && this.word.length > 0) {
      this.loadPage(1);
    }
  }


  ngOnDestroy(): void {
    
  }

  formatingDate(date: string): string {
    let dateFormatted = moment(date, 'YYYY-MM-DD');
    if (dateFormatted.isValid()) {
      return dateFormatted.format('DD-MM-YYYY');
    }
    else return null;
  }

}
