import { PaginationResponse } from './../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Project } from '../models/project';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SelectOption } from '../models/select-option';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from '../models/menu.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectService extends HttpService {

  constructor(protected http: HttpClient,
    private authService: AuthService,
    private toastrService: ToastrService) { 
    super(http);
  }

  /**
   * Get info of project
   */
  async getInfoProject(){
    const resp =  await firstValueFrom(this.get(environment.apiUrl,'/project/info/detalle'));
    const project = new Project();
    project.id = resp[0].id;
    project.name = resp[0].Nombre;
    project.description = resp[0].Descripcion;
    project.assignedResources = resp[0].RecursosAsignados;
    project.startDate = resp[0].FechaInicio;
    project.endDate = resp[0].FechaFinal;
    project.hoursProject = resp[0].HorasProyecto;
    project.progress = resp[0].Progreso;
    project.projectManagementOffice = resp[0].OficinaGetionProyectos;
    project.status = new SelectOption(resp[0].estatus.id, resp[0].estatus.Descripcion);
    
    return project;
  }


  /**
   * Check all projects, supports pagination and filter
   * @param filter 
   * @returns 
   */
  async getProjectsPaginated2(filter: any): Promise<PaginationResponse> {
    console.info('metodo mockeado');
    
    const resp = await firstValueFrom(this.http.get("assets/data/projectsPaginated.json", filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    const respJson = JSON.parse(JSON.stringify(resp));
    
    paginator.count = 20;
    paginator.data = respJson.data.map((item: any) => {
      const project = Project.mapFromObject(item);
      return project;
    });
    
    return paginator;
  }


  /**
   * Check all projects, supports pagination and filter
   * @param filter 
   * @returns 
   */
  async getProjectsPaginated(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/proyecto/pagined', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    let min = 0, max = 100;
    paginator.data = resp.data.map((item: any) => {
      const project = Project.mapFromObject(item);
      console.log(item, project);
      debugger
      
      return project;
    })
    return paginator;
  }


  /**
   * Query project by id
   * @param id 
   * @returns 
   */
  async getProjectById(id:number):Promise<Project>{
    const resp = await firstValueFrom(this.get(environment.apiUrl,`/project/${id}`));
    const project = new Project();
    project.id = resp[0].id;
    project.name = resp[0].Nombre;
    project.assignedResources = resp[0].RecursosAsignados;
    project.startDate = resp[0].FechaInicio;
    project.endDate = resp[0].FechaFinal;
    project.hoursProject = resp[0].HorasProyecto;
    project.projectManagementOffice = resp[0].OficinaGetionProyectos;
    project.status = new SelectOption(resp[0].status.id, resp[0].status.Descripcion);
    return project;
  }

  /**
   * Delete project by id
   * @param id 
   */
  async deleteProject(id:number){
    const resp = await firstValueFrom(this.delete(environment.apiUrl,`/project/${id}`));
  }

  /**
   * Persists project data
   * @param data 
   */
  async storeProject(data:any){
    try {
      if(data.id){
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl,`/project/${id}`, data));
        this.toastrService.success('Proyecto actualizado con exito.');
      }else{
        await firstValueFrom(this.post(environment.apiUrl,'/project', data));
        this.toastrService.success('Proyecto registrado con exito.');
      }
    } catch (error:any) {
      debugger
      console.log(error);
      if (error.status == 409) {
        this.toastrService.error('',error.msg);
      }
      if (error.status != 500) {
        this.toastrService.error('','Ha ocurrido un error. Intente más tarde.');
      }
      
    }
    
  }

}


