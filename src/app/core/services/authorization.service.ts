import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';
import { PaginationResponse } from '../models/pagination-response';
import { firstValueFrom } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Authorization } from '../models/authorization';
import { Apps } from '../models/apps';
import { SelectOption } from '../models/select-option';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService extends HttpService {

  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);
  }


  /**
 * Check all authorizations, supports pagination and filter
 * @param filter 
 * @returns 
 */
  async getAuthorizationsPagined(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/modulo/rol/pagined', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
      const auth = new Authorization();
      auth.id = item.id;
      auth.app = new Apps();
      auth.app.id = item.idModulo;
      auth.app.label = item.nombreModulo;
      auth.app.type = item.tipoComponente;
      let company='';
      if(item.empresa){
        company = item.empresa.nombre;
      }
      auth.role = `${item.rol} (${company})`;
      auth.status = new SelectOption(item.status.id, item.status.Descripcion);
      auth.auths = item.autorizaciones?.map((item: any) => {
        return item.permiso;
      });

      return auth;
    });
    console.log(paginator.data)
    return paginator;
  }

  /**
   * Query authorization by id
   * @param id 
   * @returns 
   */
  async getAppById(id: number): Promise<Authorization> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/modulo/rol/${id}`));
    const auth = new Authorization();
    auth.id = resp[0].id;
    auth.app = new Apps();
    auth.app.id = String(resp[0].idModulo);
    auth.app.label = resp[0].nombreModulo;
    auth.app.type = resp[0].tipoComponente;
    auth.role = resp[0].rol;
    auth.status = new SelectOption(resp[0].status.id, resp[0].status.Descripcion);
    auth.auths = resp[0].autorizaciones?.map((item: any) => {
      return item.permiso;
    });
    console.log(auth)
    return auth;
  }

  /**
* Persists authorization data
* @param data 
*/
  async storeAuthorization(data: any) {
    try {
      if (data.id) {
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl, `/modulo/rol/${id}`, data));
        this.toastrService.success('Autorización actualizado con éxito.');
      } else {
        await firstValueFrom(this.post(environment.apiUrl, '/modulo/rol', data));
        this.toastrService.success('Autorización registrado con éxito.');
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
 * Delete authorization by id
 * @param id 
 */
  async deleteAuthorization(id: number) {

    const resp = await firstValueFrom(this.delete(environment.apiUrl, `/modulo/rol/${id}`));
    if (resp && resp.msg) {
      this.toastrService.success('Autorización elimanda con éxito.');
    }
  }


}
