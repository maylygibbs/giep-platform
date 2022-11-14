import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Company } from '../models/company';
import { Spring } from '../models/spring';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class SpringService extends HttpService {

  private instruments: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);

  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);
  }

  /**
   * Check all Spring
   * @param filter 
   * @returns 
   */
      async getSpringItem(): Promise<any> {
        const resp = await firstValueFrom(this.get(environment.apiUrl, '/springitem/List'));
        const data = resp.data.map((item: any) => {
          const company = Spring.mapFromObjectlist(item);
          return company;
        });
        return resp;
      }
  
      /**
     * Check all Activity Spring
     * @param filter 
     * @returns 
     */
       async getSpringActivity(): Promise<any> {
        const resp = await firstValueFrom(this.get(environment.apiUrl, '/spring/List'));
        const data = resp.data.map((item: any) => {
          const company = Spring.mapFromObjectlist(item);
          return company;
        });
        return resp;
      }
  
     
        /**
     * Query spring by id
     * @param id 
     * @returns 
     */
    async getSpringActivityById(data:any){
        let events: Array<any> = new Array<any>();
          try {
              const id = data;
              let results: any[] = [];
              let issues: any[] = [];
  
              const resp = await firstValueFrom(this.get(environment.apiUrl,`/proyecto/spring/${id}`, data));  
              
              //results.push({'id' : 'ACTIVIDADES', 'TITLE' : 'ACTIVIDAES' });
  
              events = resp.spring?.map((item:any)=>{
                results.push(item.actividades.map((itemData: any) => {
                  return {
                    id: item.id,
                    title: itemData.titulo
                    }
                  }));
              });
  
              return results;
            
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
   * Persists spring data
   * @param data 
   */
  async storeSpring(data:any){
    try {

       console.log(data);

      if(data.id){
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl,`/spring/actualizar/${id}`, data));
        this.toastrService.success('Spring actualizado con exito.');
        
      }else{
        const resp = await firstValueFrom(this.post(environment.apiUrl,'/spring', data));
        //Object.assign(data, { idproyectoasig: resp.id});
        const jsonData = JSON.stringify(resp.id)
        localStorage.setItem('idusersproyecadd', jsonData)
        this.toastrService.success('Spring registrado con exito.');
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


