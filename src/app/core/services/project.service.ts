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
import { User } from './../models/user';
import { Spring } from '../models/spring';
import { StatusActivityTask } from '../models/statusactivitytask';
import * as moment from 'moment';
import { SpringProject } from '../models/spring-project';
import { LevelBoardProject } from '../models/level-board-project';
import { ItemTypeProject } from '../models/item-project';



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
      return project;
    })
    return paginator;
  }


  /**
   * Query project by id
   * @param id 
   * @returns 
   */
  async getProjectById(id: number): Promise<Project> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/proyecto/${id}`));
    let project = new Project();
    project.id = resp[0].id;
    project.name = resp[0].nombre;


    project.startDate = resp[0].fechaInicio;
    project.endDate = resp[0].fechaFin;
    project.hoursProject = resp[0].horaestimadas;
    project.description = resp[0].descripcion;
    project.progress = resp[0].progreso;
    project.condition = resp[0].estado;

    project.progress = resp[0].total[0].totalprogress;
    project.TypeGbProgressbar = resp[0].total[0].colorprogress;
    if (resp[0].userPmo) {
      project.pmo = new User();
      project.pmo.id = resp[0].userPmo.id;
      project.pmo.email = resp[0].userPmo.email;
      project.pmo.firstName = resp[0].userPmo.primerNombre;
      project.pmo.lastName = resp[0].userPmo.primerApellido;
      project.pmo.avatar = resp[0].userPmo.foto;
    }

    if (resp[0].recursos) {
      project.assignedResources = resp[0].recursos.map((item: any) => {
        const user = new User();
        user.id = item.id;
        user.firstName = item.primerNombre;
        user.lastName = item.primerApellido;
        user.email = item.emai;
        user.hoursDedication = item.horasdedicadas;
        user.avatar = item.foto;
        return user;
      })
    }

    project.company = new SelectOption(resp[0].empresa.id, resp[0].empresa.nombre);

    if (resp[0].estatus)
      project.status = new SelectOption(resp[0].estatus.id, resp[0].estatus.Descripcion);

    const d = new Date(resp[0].fechaInicio);
    project.startDate = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1 };
    return project;
  }

  /**
   * Delete project by id
   * @param id 
   */
  async deleteProject(id: number) {
    const resp = await firstValueFrom(this.delete(environment.apiUrl, `/proyecto/${id}`));
  }

  /**
   * Persists project data
   * @param data 
   */
  async storeProject(data: any) {
    try {
      if (data.id) {
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl, `/proyecto/actualizar/${id}`, data));
        this.toastrService.success('Proyecto actualizado con exito.');

      } else {
        const resp = await firstValueFrom(this.post(environment.apiUrl, '/proyecto', data));
        //Object.assign(data, { idproyectoasig: resp.id});
        const jsonData = JSON.stringify(resp.id)
        localStorage.setItem('idusersproyecadd', jsonData)
        this.toastrService.success('Proyecto registrado con exito.');
      }
    } catch (error: any) {
      debugger
      console.log(error);
      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }

    }

  }


  /**
* Check all status Activity
* @param filter 
* @returns 
*/
  async getStatusActivityTask(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/actividades/status/List'));
    const data = resp.data.map((item: any) => {
      const company = StatusActivityTask.mapFromObject(item);
      return company;
    });
    return data;
  }

  /**
   * Query spring list of a project
   * @param id 
   * @returns 
   */
  async getSpringsOfProject(id: any): Promise<Array<SpringProject>> {

    let results: Array<SpringProject>;
    try {

      const resp = await firstValueFrom(this.get(environment.apiUrl, `/proyecto/springboardpanel/${id}`));
      if(resp && resp.length > 0){
        results = resp.map((item: any) => {
          const spring = new SpringProject();
          spring.id = item.id;
          spring.startDate = item.fechaInicio;
          spring.endDate = item.fechaFin;
          spring.name = item.nombreSpring;
          spring.projectId = item.idProyecto;
          spring.isCurrent = item.isCurrent;
          return spring;
        })
      }

      return results;
    } catch (error: any) {
      console.log(error);
      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return results;
    }
  }

  /**
   *Consult only the resources and pmo linked to the project
   * @param id 
   * @returns 
   */
  async getProjectPmoAndResource(id: number): Promise<Project> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/proyecto/pmorecursos/${id}`));
    let project = new Project();
    project.id = resp[0].id;
    project.name = resp[0].nombre;

    if (resp[0].userPmo) {
      project.pmo = new User();
      project.pmo.id = resp[0].userPmo.id;
      project.pmo.email = resp[0].userPmo.email;
      project.pmo.firstName = resp[0].userPmo.primerNombre;
      project.pmo.lastName = resp[0].userPmo.primerApellido;
      project.pmo.avatar = resp[0].userPmo.foto;
    }

    if (resp[0].recursos) {
      project.assignedResources = resp[0].recursos.map((item: any) => {
        const user = new User();
        user.id = item.id;
        user.firstName = item.primerNombre;
        user.lastName = item.primerApellido;
        user.email = item.emai;
        user.hoursDedication = item.horasdedicadas;
        user.avatar = item.foto;
        user.totalFreeDays = item.totaldias;
        return user;
      })
    }

    return project;
  }


  /**
   * Process that links pmo to the project
   * @param data 
   */
  async addPmoToProject(data: any): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/proyecto/userpmo', data));
      this.toastrService.success('El PMO ha sido vinculado al proyecto.');
      return true;
    } catch (error: any) {

      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) { 
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;

    }
  }


  /**
   * Process that remove pmo of the project
   * @param data 
   */
  async deletePmoFromProject(projectId: string): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/proyecto/deletePmo/${projectId}`));
      this.toastrService.success('El PMO ha sido desvinculado del proyecto.');
      return true;
    } catch (error: any) {

      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;

    }
  }


  /**
 * Process that links resources to the project
 * @param data 
 */
  async addResourceToProject(data: any): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/recursosproyectoid', data));
      this.toastrService.success('El recurso ha sido vinculado al proyecto.');
      return true;
    } catch (error: any) {

      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;

    }
  }


  /**
* Process that remove resource of the project
* @param data 
*/
  async deleteResourceFromProject(data: any): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, '/recursosproyecto/deleteRecursos', data));
      this.toastrService.success('El recurso ha sido desvinculado del proyecto.');
      return true;
    } catch (error: any) {

      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;

    }
  }

  /**
   * Consult only free day of rerource
   * @param id 
   * @returns 
   */
  async getFreeDaysOfResoruce(data: any): Promise<Array<any>> {
    let freeDays = null;
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/recursosproyecto/calendariorecursos', data));

    if (resp && resp.length > 0) {
      freeDays = resp.map((item: any) => {
        return {
          id: item.id,
          startDate: item.startDate,
          endDate: item.endDate,
          days: item.dias
        }
      })
    }

    return freeDays;
  }


  /**
* Process add free days to resource
* @param data 
*/
  async addFreeDaysToResource(data: any): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/recursosproyecto/calendariosrecursosproyecto', data));

      this.toastrService.success('Los dias libres del recurso se ha registrado con éxito.');
      return true;
    } catch (error: any) {

      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;

    }
  }

  /**
* Process add free days to resource
* @param data 
*/
  async deleteFreeDaysFromResource(id: any): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, '/recursosproyecto/deletecalendariorecursos', { calendarioRecursosId: id }));

      this.toastrService.success('Los dias libres del recurso se han eliminado con éxito.');
      return true;
    } catch (error: any) {

      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;

    }
  }


  /**
   * Consult free days of project by id project
   * @param id 
   * @returns 
   */
  async getFreeDaysOfProject(id: number): Promise<Project> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/calendarioproyecto/${id}`));
    let project = new Project();

    project.totalFreeDays = resp.totaldias;
    if (resp.data) {
      project.freeDays = resp.data.map((item: any) => {
        return {
          id: item.id,
          startDate: item.fecha_inicio_nolaboral,
          endDate: item.fecha_fin_nolaboral,
          days: item.dias
        }
      })
    }
    return project;
  }


  /**
  * Process add free days to resource
  * @param data 
  */
  async addFreeDaysToProject(data: any): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/calendarioproyecto', data));

      this.toastrService.success('Los dias libres del proyecto se ha registrado con éxito.');
      return true;
    } catch (error: any) {

      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;

    }
  }


  /**
* Process add free days to resource
* @param data 
*/
  async deleteFreeDaysFromProject(id: any): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, '/recursosproyecto/deletecalendarioproyecto', { idCalendarioProyecto: id }));
      this.toastrService.success('Los dias libres del proyecto se han eliminado con éxito.');
      return true;
    } catch (error: any) {

      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;

    }
  }

  /**
   * Get Configured Columns / levels Board
   * @returns 
   */
  async getConfiguredColumns(): Promise<Array<LevelBoardProject>> {
    let levels: Array<LevelBoardProject>;
    let resp = await firstValueFrom(this.get(environment.apiUrl, '/proyecto/nivelboard/List'));
    levels = resp.data.map((item) => {
      const level = new LevelBoardProject();
      level.id = item.id;
      level.levelName = item.nombrenivelpanel;
      level.attr_key = item.attr_key;
      return level

    })
    return levels;
  }

  /**
 * Get Configured Item types
 * @returns 
 */
  async getItemsTypes(): Promise<Array<ItemTypeProject>> {
    let types: Array<ItemTypeProject>;
    let resp = await firstValueFrom(this.get(environment.apiUrl, '/proyecto/typeitemsevent/List'));
    types = resp.data.map((item) => {
      const type = new ItemTypeProject();
      type.id = item.id;
      type.label = item.label;
      type.icon_class = item.icon_class;
      type.color = item.color;
      return type

    })
    return types;
  }




}


