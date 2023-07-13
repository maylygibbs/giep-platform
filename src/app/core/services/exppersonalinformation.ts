import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ExpPersonalInformation } from '../models/exp-personal-information';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ExppersonalinformationService extends HttpService {

  
  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);
  }


  /**
   * Query project by id
   * @param ci 
   * @returns 
   */
  //async getStaffById(ci:number):Promise<ExpPersonalInformation>{
async getStaffById(data:any){
  let events: Array<any> = new Array<any>();
    const ci = data;
    //let ci1 = 0;
    const resp = await firstValueFrom(this.get(environment.apiUrl,`/staexped/personal/${ci}`));
    const arrayVacio = (resp) => !Array.isArray(resp) || resp.length === 0;
    /* if (arrayVacio.length === 0){
      ci1 = 0;
    }else{
      ci1 = 1;
    } */

    if (resp){
        events = resp.data.map((item: any) => {
          return ExpPersonalInformation.mapFromObject(item);
        })
    return events;
    }
  }


  /**
   * Persists staff data
   * @param data 
   */
  async storeStaff(data:any){
    try {
      if(data.id){
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl,`/staexped/personal/actualizar/${id}`, data));
        this.toastrService.success('Datos Personales actualizado con exito.');
        
      }else{
        const resp = await firstValueFrom(this.post(environment.apiUrl,'/staexped/personal', data));
        //Object.assign(data, { idproyectoasig: resp.id});
        const jsonData = JSON.stringify(resp.id)
        // localStorage.setItem('idusersproyecadd', jsonData)
        this.toastrService.success('Datos Personales registrado con exito.');
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
   * Upload document
   * @param formData 
   */
   async reports(id: number): Promise<any> {
    let response: any = null;
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/tokenpdf/reportes/${id}`));
      console.log(resp);
      this.toastrService.success('Reporte Generado con éxito.');
      response = resp;
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error descargando el archivo.');
      }
    } finally {
      return response;
    }
  }

/**
   * Persists reportsStaff data
   * @param data 
   */
async reportsStaff(data:any): Promise<any> {
  let response: any = null;
  try {
      const resp = await firstValueFrom(this.post(environment.apiUrl,'/tokenpdf/reportesstaff/', data));
      this.toastrService.success('Reporte Generado con éxito.');
      response = resp;
    } catch (error: any) {
      console.log(error)
      if (error.status) {
        this.toastrService.error(error.error.error);
      } else {
        this.toastrService.error('Ha ocurrido un error descargando el archivo.');
      }
    } finally {
      return response;
    }
}


/**
   * Upload document
   * @param formData 
   */
async reportsExcel(reports: string): Promise<any> {
  let response: any = null;
  try {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/tokenpdf/reportesdetallesexcel/${reports}`));
    console.log(resp);
    this.toastrService.success('Reporte Generado con éxito.');
    response = resp;
  } catch (error: any) {
    console.log(error)
    if (error.status) {
      this.toastrService.error(error.error.error);
    } else {
      this.toastrService.error('Ha ocurrido un error descargando el archivo.');
    }
  } finally {
    return response;
  }
}




}