import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Sleeptype } from '../models/sleeptype';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class SleeptypeService extends HttpService {

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
  async getSleeptype(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/staexped/tiporeposo/List'));
    const data = resp.data.map((item: any) => {
      const profession = Sleeptype.mapFromObject(item);
      return profession;
    });
    return data;
  }

  async getSleeptypev(): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/staexped/tiporeposo/List'));
    const data = resp.data.map((item: any) => {
      const profession = Sleeptype.mapFromObjectv(item);
      return profession;
    });
    return data;
  }


  /**
   * Persists Profession data
   * @param data 
   */
  async storetSleeptype(data:any){
    try {
      if(data.id){
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl,`/staexped/tiporeposo/actualizar/${id}`, data));
        this.toastrService.success('Datos actualizado con exito.');
      }else{
        const resp = await firstValueFrom(this.post(environment.apiUrl,'/staexped/tiporeposo', data));
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