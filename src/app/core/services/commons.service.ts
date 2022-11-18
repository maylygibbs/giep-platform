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
  async getAllStatus(): Promise<Array<SelectOption>> {

    let status: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/status/list`))
    status = resp.data.map((item: any) => {
      return new SelectOption(item.id, item.descripcion);
    });

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
      const socialNetwork = new SelectOption(item.id, item.nombre);
      socialNetwork.icon = item.icono;
      return socialNetwork;
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
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/encuesta/tipocategoria/list'));
    categories = resp.data.map((item: any) => {
      return new SelectOption(item.id, item.nombre);
    });
    return categories;
  }


  /**
* Get all categories
* @returns 
*/
  async getAllColorSticker(): Promise<Array<SelectOption>> {

    let colors: Array<SelectOption> = new Array<SelectOption>();
    colors.push(new SelectOption('bgcolor-orange', 'Naranja', false, 'rgb(253, 126, 20)'));
    colors.push(new SelectOption('bgcolor-pink', 'Rosado', false, 'rgb(241, 0, 117)'));
    colors.push(new SelectOption('bgcolor-emerald', 'Esmeralda', false, 'rgb(0, 204, 204)'));
    colors.push(new SelectOption('bgcolor-green', 'Verde', false, 'rgb(16, 183, 89)'));
    colors.push(new SelectOption('bgcolor-lilac', 'Lila', false, 'rgb(91, 71, 251)'));
    return this.resolveWith(colors);
  }

  /**
   * get all users emails
   */
  async getAllUsersEmails() {
    let usersEmails: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.get(environment.apiUrl, '/calendario/event/usuarios'));
    usersEmails = resp.data.map((item: any) => {
      return new SelectOption(item.email, item.nombre + ' | ' + item.email);
    });
    return usersEmails;
  }

  /**
  * Get all instruments
  * @returns 
  */
  async getAllInstruments(): Promise<Array<SelectOption>> {

    let inputsType: Array<SelectOption> = new Array<SelectOption>();
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/instrumentocaptura/list/all'));
    inputsType = resp.data.map((item: any) => {
      return new SelectOption(item.id, item.nombre);
    });
    return inputsType;
  }

}
