import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Area } from '../models/area';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AreaService extends HttpService {

  private instruments: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);

  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);

  }


  /**
   * Check all Answers
   * @param filter 
   * @returns 
   */
  async getArea(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/staexped/area/List'));
    const data = resp.data.map((item: any) => {
      const profession = Area.mapFromObject(item);
      return profession;
    });
    return data;
  }


  async getAreav(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/staexped/area/List'));
    const data = resp.data.map((item: any) => {
      const profession = Area.mapFromObjectv(item);
      return profession;
    });
    return data;
  }

    /**
   * Query academic by id
   * @param id 
   * @returns 
   */
    async getAreaById(data:any){
      let events: Array<any> = new Array<any>();
        const id = data;
        const resp = await firstValueFrom(this.get(environment.apiUrl,`/staexped/area/${id}`));
        const arrayVacio = (resp) => !Array.isArray(resp) || resp.length === 0;
        if (resp){
            events = resp.data.map((item: any) => {
              const profession = Area.mapFromObject(item);
              return profession;
              //return Area.mapFromObject(item);
            })
        return events;
        }
      }

      /**
   * Query academic by id
   * @param id 
   * @returns 
   */
    async getAreamById(data:any){
      let events: Array<any> = new Array<any>();
        const id = data;
        const resp = await firstValueFrom(this.get(environment.apiUrl,`/staexped/area/${id}`));
        const arrayVacio = (resp) => !Array.isArray(resp) || resp.length === 0;
        if (resp){
            events = resp.data.map((item: any) => {
              const profession = Area.mapFromObjectv(item);
              return profession;
              //return Area.mapFromObject(item);
            })
        return events;
        }
      }

   /**
   * Persists Profession data
   * @param data 
   */
  async storeArea(data:any){
    try {
      if(data.id){
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl,`/staexped/area/actualizar/${id}`, data));
        this.toastrService.success('Datos actualizado con exito.');
      }else{
        const resp = await firstValueFrom(this.post(environment.apiUrl,'/staexped/area', data));
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



}