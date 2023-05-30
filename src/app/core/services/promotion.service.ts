import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Promotion } from '../models/promotion';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class PromotionService extends HttpService {

  
  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);
  }

  async getCargo(){
    let events: Array<any> = new Array<any>();
    try {
        const resp = await firstValueFrom(this.get(environment.apiUrl,`/cargo/list`));
        if (resp){
          events = resp.data.map((item: any) => {
            return Promotion.mapFromObjectCargo(item);
          })
        return events;
       }


        /* events = resp.data?.map((item:any)=>{
          return {
            id: item.id,
            cargo: item.descripcion,
          }
  
        }); */

        //return new SelectOption(events);
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
   * Query academic by id
   * @param id 
   * @returns 
   */
    async getPromotionById(data:any){
      let events: Array<any> = new Array<any>();
        const id = data;
        const resp = await firstValueFrom(this.get(environment.apiUrl,`/staexped/histmovpromocion/${id}`));
        const arrayVacio = (resp) => !Array.isArray(resp) || resp.length === 0;
        if (resp){
            events = resp.data.map((item: any) => {
              return Promotion.mapFromObject(item);
            })
        return events;
        }
      }

  /**
   * Persists Academicstudy data
   * @param data 
   */
  async storePromotion(data:any){
    try {
      if(data.id){
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl,`/staexped/histmovpromocion/actualizar/${id}`, data));
        this.toastrService.success('Datos Estudios Academicos actualizado con exito.');
        
      }else{
        const resp = await firstValueFrom(this.post(environment.apiUrl,'/staexped/histmovpromocion', data));
        const jsonData = JSON.stringify(resp.id)
        this.toastrService.success('Datos registrado con exito.');
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
   * Query academic by id
   * @param id 
   * @returns 
   */
   async storePromotionDelete(data:any){
    try {
        const id = data;
        //delete data.id;
        await firstValueFrom(this.delete(environment.apiUrl,`/staexped/histmovpromocion/eliminar/${id}`, data));
        this.toastrService.success('Datos eliminados con exito.');
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


