import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaginationResponse } from '../models/pagination-response';
import { HttpService } from './http.service';
import { environment } from './../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { Apps } from '../models/apps';
import { SelectOption } from '../models/select-option';

@Injectable({
  providedIn: 'root'
})
export class AppsService extends HttpService {

  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);
  }




  /**
 * Check all apps, supports pagination and filter
 * @param filter 
 * @returns 
 */
  async getAppsPagined(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/modulo/pagined', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
      const app = new Apps();
      app.id = item.id;
      app.label = item.nombre;
      app.description = item.descripcion;
      app.status = new SelectOption(item.status.id, item.status.Descripcion);
      app.parent =  resp.padre ? new SelectOption(resp.padre.id, resp.padre.Descripcion) : new SelectOption();
      app.type = item.tipoComponente;
      app.icon = item.icono;
      app.children = item.hijos?.map((item: any) => {
        const child = new Apps();
        child.id = item.id;
        child.label = item.MenuHijo;
      });
      app.roles = item.roles?.map((item: any) => {
        return item.rol;
      });
      return app;
    });

    return paginator;
  }


  /**
 * Query app by id
 * @param id 
 * @returns 
 */
  async getAppById(id: number): Promise<Apps> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/modulo/${id}`));
    const app = new Apps();
    app.id = resp.id;
    app.label = resp.nombre;
    app.description = resp.descripcion;
    app.status = new SelectOption(resp.status.id, resp.status.Descripcion);
    app.parent =  resp.padre ? new SelectOption(resp.padre.id, resp.padre.Nombre) : new SelectOption();
    app.type = resp.tipoComponente;
    app.icon = resp.icono;
    app.position = resp.orden;
    app.path = resp.path;
    app.children = resp.hijos?.map((item: any) => {
      const child = new Apps();
      child.id = item.id;
      child.label = item.MenuHijo;
    });
    app.roles = resp.roles?.map((item: any) => {
      return item.rol.nombre;
    });

    app.authoritations = resp.autorizaciones?.map((item:any)=>{
      return item.permiso;
    });

    console.log(app)
    return app;

  }


  /**
* Persists app data
* @param data 
*/
  async storeApp(data: any) {
    try {
      if (data.id) {
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl, `/modulo/${id}`, data));
        this.toastrService.success('Widget o menu actualizado con éxito.');
      } else {
        await firstValueFrom(this.post(environment.apiUrl, '/modulo', data));
        this.toastrService.success('Widget o menu registrado con éxito.');
      }
    } catch (error: any) {

      console.log(error);
      if (error.status == 409) {
        this.toastrService.error('', error.msg);
      }
      if (error.status != 500) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }

    }
  }

  /**
   * Delete app by id
   * @param id 
   */
   async deleteApp(id: number) {
    
    const resp = await firstValueFrom(this.delete(environment.apiUrl, `/modulo/${id}`));
    if(resp && resp.msg){
      this.toastrService.success('Widget o menu elimando con éxito.');
    }
  }

  

}
