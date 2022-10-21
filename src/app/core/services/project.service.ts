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
    const resp =  await firstValueFrom(this.get(environment.apiUrl,'/proyecto/info/detalle'));
    const project = Project.mapFromObject(resp[0]);
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

    
    

    const resp = await firstValueFrom(this.get(environment.apiUrl,`/proyecto/${id}`));
    const project = Project.mapFromObject(resp[0]);
    
    //const project = new Project();
    
    /* project.name = resp[0].nombre;
    project.hoursProject= resp[0].horaestimadas;
    project.description= resp[0].descripcion;

    project.company = new SelectOption(resp[0].empresa.id, resp[0].empresa.nombre) ; */



    //project.projectManagementOffice = new SelectOption(resp[0].empresa.id, resp[0].empresa.nombre) ;

    /* project.projectManagementOffice = resp[0].userPmo.map((item:any)=>{
      return {item.id,item.xssd};
    }); */

    /* project.projectManagementOffice = resp[0].userPmo.map((u: SelectOption, index: number) => {
      const user = new User();
      user.id = '1';
      user.firstName = 'Juan Blanco';
      return user;
    }); */

   
    //project.projectManagementOffice = new SelectOption(resp[0].userPmo.id, resp[0].userPmo.primerNombre+' '+ resp[0].userPmo.primerApellido) ;
    //project.projectManagementOffice = resp[0].userPmo;
    //project.projectManagementOffice = new SelectOption(resp[0].userPmo.id,resp[0].userPmo.id) ;

    /* id: string;
    username: string;
    token?: string;
    roles?: any[];
    firstName: string;
    secondName: string;
    lastName: string; */


    //dependence, dependenceId, position, positionId


    //console.log(resp[0].userPmo);
   // project.projectManagementOffice = {email: 'sirjcbg1@hotmail.com', firstName: 'Juan',  id: '1',lastName:'Blanco',username: 'Juan Blanco',secondName:'mariano',secondLastName:'baez'};

    //const d = new Date(resp[0].fechaInicio);
    //project.startDate = {year: d.getFullYear(), month: d.getMonth() , day: d.getDate()};

    //const project = Project.mapFromObject(resp[0]);
    return project;
  }

  /**
   * Delete project by id
   * @param id 
   */
  async deleteProject(id:number){
    const resp = await firstValueFrom(this.delete(environment.apiUrl,`/proyecto/${id}`));
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
        await firstValueFrom(this.put(environment.apiUrl,`/proyecto/${id}`, data));
        this.toastrService.success('Proyecto actualizado con exito.');
        
      }else{
        const resp = await firstValueFrom(this.post(environment.apiUrl,'/proyecto', data));
        //Object.assign(data, { idproyectoasig: resp.id});
        const jsonData = JSON.stringify(resp.id)
        localStorage.setItem('idusersproyecadd', jsonData)
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

  /**
   * Persists resources data
   * @param data 
   */
   async storeResources(data:any){
    try {
      if(data.id){
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl,`/recursosproyecto/${id}`, data));
        this.toastrService.success('Recurso actualizado con exito.');
        
      }else{
        await firstValueFrom(this.post(environment.apiUrl,'/recursosproyecto', data));
        this.toastrService.success('Recurso registrado con exito.');
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

  /**
   * Persists of non-working days data
   * @param data 
   */
   async storeNonworkingDays(data:any){
    try {
      if(data.id){
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl,`/calendarioproyecto/${id}`, data));
        this.toastrService.success('Recurso actualizado con exito.');
        
      }else{
        await firstValueFrom(this.post(environment.apiUrl,'/calendarioproyecto', data));
        this.toastrService.success('Recurso registrado con exito.');
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
 


   /**
   * Persists project data
   * @param data 
   */
    async storeProjectCalendar(data:any){
      let events: Array<any> = new Array<any>();
      try {
        if(data.id){
          const id = data.id;
          delete data.id;
          await firstValueFrom(this.put(environment.apiUrl,`/calendarios/List`, data));
          this.toastrService.success('Proyecto actualizado con exito.');
          
        }else{
          const resp = await firstValueFrom(this.get(environment.apiUrl,`/calendarios/List`, data));
          //Object.assign(data, { idproyectoasig: resp.id});
          /* const jsonData = JSON.stringify(resp.id)
          localStorage.setItem('idusersproyecadd', jsonData) */
          //this.toastrService.success('Proyecto registrado con exito.');
          events = resp.data?.map((item:any)=>{
            return {
              id: item.id,
              title: item.descripcion,
              start: item.fecha_desde,
              end: item.fecha_hasta,
              base: 't',
            }
    
          });
          return events;
          //return resp;
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


