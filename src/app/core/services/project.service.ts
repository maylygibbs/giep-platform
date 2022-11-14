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
    const d = new Date(resp[0].fechaInicio);
    project.startDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() + 1};
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
        await firstValueFrom(this.put(environment.apiUrl,`/proyecto/actualizar/${id}`, data));
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
        await firstValueFrom(this.put(environment.apiUrl,`/recursosproyecto/actualizar/${id}`, data));
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
        await firstValueFrom(this.put(environment.apiUrl,`/calendarioproyecto/actualizar/${id}`, data));
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


   /**
   * Query project by id
   * @param id 
   * @returns 
   */
  async getProjectCalendarById(data:any){
    let events: Array<any> = new Array<any>();
      try {
          const id = data;
          const resp = await firstValueFrom(this.get(environment.apiUrl,`/calendarioproyecto/${id}`, data));
          events = resp.data?.map((item:any)=>{
            return {
              id: item.id,
              title: 'No Laborable',
              start: item.fecha_inicio_nolaboral,
              end: item.fecha_fin_nolaboral,
              base: 'f',
            }
    
          });
          return events;
        
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
      
    //return project;
  }


   


      /**
   * Query project by id
   * @param id 
   * @returns 
   */
  async getBoardPanelById(data:any){
    let events: Array<any> = new Array<any>();
      try {
          const id = data;
          let results: any[] = [];
          let issues: any[] = [];
          const resp = await firstValueFrom(this.get(environment.apiUrl,`/proyecto/boardpanel/${id}`, data));  
          return resp;
        
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
      
    //return project;
  }


    /**
   * Query project by id baglog
   * @param id 
   * @returns 
   */
     async getBoardPanelBagLogById(data:any){
      let events: Array<any> = new Array<any>();
        try {
            const id = data;
            let results: any[] = [];
            let issues: any[] = [];
            const resp = await firstValueFrom(this.get(environment.apiUrl,`/proyecto/boardpanelbacklog/${id}`, data));  
            return resp;
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
        
      //return project;
    }
  
    /**
   * Query project by id baglog spring
   * @param id 
   * @returns 
   */
     async getBoardpanelspringbacklogById(data:any){
      let events: Array<any> = new Array<any>();
        try {
            const id = data;
            let results: any[] = [];
            let issues: any[] = [];
            const resp = await firstValueFrom(this.get(environment.apiUrl,`/proyecto/boardpanelspringbacklog/${id}`, data));  
            return resp;
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
        
      //return project;
    }
  
  
        /**
   * Query project by id
   * @param id 
   * @returns 
   */
         async getBoardPanelActivityById(data:any){
          let events: Array<any> = new Array<any>();
            try {
                const id = data;
                const idproyct = localStorage.getItem('projectidselect');
                let results: any[] = [];
                let issues: any[] = [];
      
                const resp = await firstValueFrom(this.get(environment.apiUrl,`/proyecto/boardpanelactivity/${idproyct}/${id}`, data));  
                return resp;
              
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
            
          //return project;
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
   * Query project by id spring
   * @param id 
   * @returns 
   */
   async getSpringBoardPanelById(data:any){
    let events: Array<any> = new Array<any>();
      try {
          const id = data;
          let results: any[] = [];
          let issues: any[] = [];
          const resp = await firstValueFrom(this.get(environment.apiUrl,`/proyecto/springboardpanel/${id}`, data));  
          return resp;
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


