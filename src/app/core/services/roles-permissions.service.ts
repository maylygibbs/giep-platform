import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';
import { PaginationResponse } from './../models/pagination-response';
import { firstValueFrom } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Rol } from '../models/rol';
import { SelectOption } from '../models/select-option';

@Injectable({
  providedIn: 'root'
})
export class RolesPermissionsService extends HttpService {

  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);
  }


  /**
 * Check all roles, supports pagination and filter
 * @param filter 
 * @returns 
 */
  async getRolesPagined(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/rol/pagined', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
      const rol = new Rol();
      rol.id = item.id;
      rol.label = item.descripcion;
      rol.status = new SelectOption(item.id_status_id.statusId, item.id_status_id.statusLabel);
      if(item.empresa){
        rol.company = new SelectOption(item.empresa.id,item.empresa.nombre)
      }
      return rol;
    });
    console.log('paginator',paginator)
    return paginator;
  }


  /**
 * Query rol by id
 * @param id 
 * @returns 
 */
  async getRolById(id: number): Promise<Rol> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/rol/${id}`));
    const input = new Rol();
    input.id = resp[0].id;
    input.label = resp[0].nombre;
    return input;
  }

  /**
   * Delete Rol by id
   * @param id 
   */
  async deleteRole(id: number) {
    
    const resp = await firstValueFrom(this.delete(environment.apiUrl, `/rol/${id}`));
    if(resp && resp.msg){
      this.toastrService.success('Role elimando con éxito.');
    }
  }


  /**
* Persists rol data
* @param data 
*/
  async storeRole(data: Rol) {
    try {
      if (data.id) {
        const id = data.id;
        await firstValueFrom(this.put(environment.apiUrl, `/rol/${id}`, { descripcion: data.label, statusId: parseInt(data.status.value), idempresa: data.company.id }));
        this.toastrService.success('Rol actualizado con éxito.');
      } else {
        await firstValueFrom(this.post(environment.apiUrl, '/rol', { descripcion: data.label, idempresa: data.company.id }));
        this.toastrService.success('Rol registrado con éxito.');
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




}
