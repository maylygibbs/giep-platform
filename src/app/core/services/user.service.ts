import { PaginationResponse } from './../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../models/user';
import { firstValueFrom } from 'rxjs';
import { SelectOption } from '../models/select-option';
import { unstable_UserBlockingPriority } from 'preact/compat';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  constructor(protected http: HttpClient,
    private authService: AuthService) { 
    super(http);
  }

  /**
   * Get info of user
   */
  async getInfoUser(){
    const resp =  await firstValueFrom(this.get(environment.apiUrl,'/user/info/detalle'));
    const user = new User();
    user.token = this.authService.currentUser.token;
    user.firstName = resp[0].primerNombre;
    user.lastName = resp[0].primerApellido;
    user.secondName = resp[0].segundoNombre;
    user.secondLastName = resp[0].segundoApellido;
    user.email = resp[0].email;
    user.dependence = new SelectOption(resp[0].Dependencia.id, resp[0].Dependencia.Descripcion) ;
    user.position = new SelectOption(resp[0].cargo.id, resp[0].cargo.Descripcion);
    user.phone = resp[0].telefonos;
    user.birthDate = resp[0].fechaNacimiento;
    user.documentType = resp[0].tipoDocumentoIdentidad;
    user.documentNumber = resp[0].numeroDocumento;
    user.status = new SelectOption(resp[0].status.id, resp[0].status.Descripcion);
    this.authService.saveUserInLocalstorage(user);
    return user;
  }

/**
 * Check all users, supports pagination and filter
 * @param filter 
 * @returns 
 */
  async getUsersPaginated(filter:any):Promise<PaginationResponse>{
    const resp = await firstValueFrom(this.post(environment.apiUrl,'/user/all',filter));
    const paginator = new PaginationResponse(filter.page,filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item:any)=>{
      const user = new User();
      user.id = item.id;
      user.username = item.username;
      user.token = this.authService.currentUser.token;
      user.firstName = item.primerNombre;
      user.lastName = item.primerApellido;
      user.secondName = item.segundoNombre;
      user.secondLastName = item.segundoApellido;
      user.email = item.email;
      user.dependence = new SelectOption(item.Dependencia.id, item.Dependencia.Descripcion) ;
      user.position = new SelectOption(item.cargo.id, item.cargo.Descripcion);
      user.phone = item.telefonos;
      user.birthDate = item.fechaNacimiento;
      user.documentType = item.tipoDocumentoIdentidad;
      user.documentNumber = item.numeroDocumento;
      user.status = new SelectOption(item.status.id, item.status.Descripcion);
      return user;
    })
    return paginator;
  }


  /**
   * Query user by id
   * @param id 
   * @returns 
   */
  async getUserById(id:number):Promise<User>{
    const resp = await firstValueFrom(this.get(environment.apiUrl,`/user/${id}`));
    const user = new User();
    user.id = resp[0].id;
    user.username = resp[0].username;
    user.firstName = resp[0].primerNombre;
    user.lastName = resp[0].primerApellido;
    user.secondName = resp[0].segundoNombre;
    user.secondLastName = resp[0].segundoApellido;
    user.email = resp[0].email;
    user.dependence = new SelectOption(resp[0].Dependencia.id, resp[0].Dependencia.Descripcion) ;
    user.position = new SelectOption(resp[0].cargo.id, resp[0].cargo.Descripcion);
    user.phone = resp[0].telefonos;
    user.birthDate = resp[0].fechaNacimiento;
    user.documentType = resp[0].tipoDocumentoIdentidad;
    user.documentNumber = resp[0].numeroDocumento;
    user.status = new SelectOption(resp[0].status.id, resp[0].status.Descripcion);
    return user;
  }

  /**
   * Delete user by id
   * @param id 
   */
  async deleteUser(id:number){
    const resp = await firstValueFrom(this.delete(environment.apiUrl,`/user/${id}`));
  }

}


