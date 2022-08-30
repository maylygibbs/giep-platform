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


  /**
  * Get all roles
  * @returns 
  */
  async getAllCountries(): Promise<Array<SelectOption>> {

    let countries: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/pais/List'))
    countries = resp.data.map((item: any) => {
      return new SelectOption(item.id, item.nombre);
    });
    return countries;
  }

  /**
* Get all states by id pais
* @returns 
*/
  async getAllStates(id: number): Promise<Array<SelectOption>> {

    let states: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/estado/pais/${id}`))
    states = resp.map((item: any) => {
      return new SelectOption(item.id, item.nombre);
    });
    return states;

}


  /**
* Get all status
* @returns 
*/
  async getAllStatus(): Promise < Array < SelectOption >> {

  let status: Array < SelectOption > = new Array<SelectOption>();
  const resp = await firstValueFrom(this.get(environment.apiUrl, `/status/list`))
    status = resp.data.map((item: any) => {
    return new SelectOption(item.id, item.descripcion);
  });
  console.log(status);

  return status;

}


  /**
* Get all city by id estados
* @returns 
*/
  async getAllCities(id: number): Promise<Array<SelectOption>> {

    let cities: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/ciudad/estado/${id}`))
    cities = resp.map((item: any) => {
      return new SelectOption(item.id, item.nombre);
    });
    return cities;

  }

  /**
   * Get all social networks
   * @returns 
   */
  async getAllSocialNetwork(): Promise<Array<SelectOption>> {

    let redes: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/tiporedes/List'));
    redes = resp.data.map((item: any) => {
      return new SelectOption(item.id, item.nombre);
    });
    return redes;
  }

  /**
   * Get all units type
   * @returns 
   */
  async getAllUnitsType(): Promise<Array<SelectOption>> {

    let unitsType: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/encuesta/tipounidad/list'));
    unitsType = resp.data.map((item: any) => {
      return new SelectOption(item.id, item.nombre);
    });
    return unitsType;
  }


  /**
* Get all inputs type
* @returns 
*/
  async getAllInputsType(): Promise<Array<SelectOption>> {

    let inputsType: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/encuesta/tipoinpunt/list'));
    inputsType = resp.data.map((item: any) => {
      return new SelectOption(item.id, item.nombre);
    });
    return inputsType;
  }

  /**
* Get all categories
* @returns 
*/
  async getAllCategories(): Promise<Array<SelectOption>> {

    let categories: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/tipocategoria/list'));
    categories = resp.data.map((item: any) => {
      return new SelectOption(item.id, item.nombre);
    });
    return categories;
  }

}
