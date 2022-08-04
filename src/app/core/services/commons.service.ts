import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SelectOption } from '../models/select-option';
import { HttpService } from './http.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonsService extends HttpService {

  constructor(protected http: HttpClient) {
    super(http);
  }


  /**
   * Get all dependences
   * @returns 
   */
  async getAlldependences(): Promise<Array<SelectOption>> {

    let dependences: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/dependencia/list'))
    dependences = resp.data.map((item: any) => {
      return new SelectOption(item.id, item.descripcion);
    });
    return dependences;

  }

  /**
   * Get all positions
   * @returns 
   */
  async getAllPositions(): Promise<Array<SelectOption>> {

    let positions: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/cargo/list'))
    positions = resp.data.map((item: any) => {
      return new SelectOption(item.id, item.descripcion);
    });
    return positions;

  }


  /**
* Get all roles
* @returns 
*/
  async getAllRoles(): Promise<Array<SelectOption>> {

    let roles: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/rol/list'))
    const temp = resp[0];
    roles = temp.map((item: any) => {
      return new SelectOption(item.descripcion, item.descripcion);
    });
    return roles;

  }

}
