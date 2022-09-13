import { PaginationResponse } from './../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from '../models/user';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SelectOption } from '../models/select-option';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from '../models/menu.model';


@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {
  
  private instruments: BehaviorSubject< Array<any>> = new BehaviorSubject< Array<any>>(null);

  constructor(protected http: HttpClient,
    private authService: AuthService,
    private toastrService: ToastrService) { 
    super(http);
  }

  async uploadAvatar(formData:FormData){
    await firstValueFrom(this.post(environment.apiUrl,'/user/upload/photo',formData));
  }

  /**
   * Get info of user
   */
  async getInfoUser(){
    const resp =  await firstValueFrom(this.get(environment.apiUrl,'/user/info/detalle'));
    const user = new User();
    user.id = resp[0].id;
    user.token = this.authService.currentUser.token;
    user.firstName = resp[0].primerNombre;
    user.lastName = resp[0].primerApellido;
    user.secondName = resp[0].segundoNombre;
    user.secondLastName = resp[0].segundoApellido;
    user.email = resp[0].email;
    user.dependence = new SelectOption(resp[0].Dependencia.id, resp[0].Dependencia.Descripcion) ;
    user.position = new SelectOption(resp[0].cargo.id, resp[0].cargo.Descripcion);
    user.phones = resp[0].telefonos;
    user.birthDate = resp[0].fechaNacimiento;
    user.documentType = resp[0].tipoDocumentoIdentidad;
    user.documentNumber = resp[0].numeroDocumento;
    user.status = new SelectOption(resp[0].status.id, resp[0].status.Descripcion);
    user.avatar = resp[0].foto;
    user.createAt = resp[0].createAt;
    user.updateAt = resp[0].updateAt;
    user.roles = resp[0].roles.map((itemRol:any)=>{
      return itemRol.rol;
    })
    user.instrumentsPending = resp[0].instrumentosPendientes && resp[0].instrumentosPendientes.length > 0 ? resp[0].instrumentosPendientes : null  ;
    this.instruments.next(user.instrumentsPending);
    const arrayMenu: Array<MenuItem> = new Array<MenuItem>();

    resp[0].opcionesMenu.forEach((item:any) => {
      const menuItem = new MenuItem();
      menuItem.label = item.nombre;
      menuItem.isTitle = item.isTitle == 'true' ? true : false;
      menuItem.link = item.path;
      menuItem.icon = item.icon;
      menuItem.order = item.orden;
      arrayMenu.push(menuItem);
      if(item.hijos && item.hijos.MenuChild){
        item.hijos.MenuChild.forEach((itemChild:any) => {
          const menuItemChild = new MenuItem();
          menuItemChild.label = itemChild.menu;
          menuItemChild.isTitle = itemChild.isTitle == 'true' ? true : false;
          menuItemChild.link = itemChild.path;
          menuItemChild.icon = itemChild.icon;
          menuItemChild.order = itemChild.orden;
          if(itemChild.hijos && itemChild.hijos.MenuChild){
            menuItemChild.subItems = itemChild.hijos.MenuChild.map((itemSubChild:any)=>{
              const menuSubItemChild = new MenuItem();
              menuSubItemChild.label = itemSubChild.menu;
              menuSubItemChild.isTitle = itemSubChild.isTitle == 'true' ? true : false;
              menuSubItemChild.link = itemSubChild.path;
              //menuSubItemChild.icon = itemSubChild.icon;
              menuSubItemChild.order = itemSubChild.orden;
              return menuSubItemChild;
            })
          }
          arrayMenu.push(menuItemChild);
        });
      }

    })
    
    user.optionsMenu = arrayMenu;
    console.log('arrayMenu', arrayMenu)
    user.sex = resp[0].sexo
    user.address = resp[0].direccion;
    user.country = new SelectOption(resp[0].pais?.id, resp[0].pais.Nombre);
    user.state = new SelectOption(resp[0].estado?.id, resp[0].estado.Nombre);
    user.city = new SelectOption(resp[0].ciudad?.id, resp[0].ciudad.Nombre);

    if (resp[0].redes) {
      user.socialNetwork = resp[0].redes.map((item:any)=>{
          return { idTipo:item.idTipo, label:null, networkDir: item.red }
      });
    }

    this.authService.updateUserSource(user);
    this.authService.saveUserInLocalstorage(user);
    return user;
  }

  /**
   * Get observable of instruments
   */
  get $instruments(){
    return this.instruments.asObservable();
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
      user.phones = item.telefonos;
      user.birthDate = item.fechaNacimiento;
      user.documentType = item.tipoDocumentoIdentidad;
      user.documentNumber = item.numeroDocumento;
      user.status = new SelectOption(item.status.id, item.status.Descripcion);
      user.createAt = item.createAt;
      user.updateAt = item.updateAt;
      user.sex = item.sexo;
      user.address = item.direccion;
      user.country = new SelectOption(item.pais?.id);
      user.state = new SelectOption(item.estado?.id);
      user.city = new SelectOption(item.ciudad?.id);
      return user;
    })
    return paginator;
  }


  /**
   * Check all users
   * @param filter 
   * @returns 
   */
  async getUsers(filter: any): Promise<any> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/user/all', filter));
    const data = resp.data.map((item: any) => {
      const user = new User();
      user.id = item.id;
      user.username = item.username;
      user.token = this.authService.currentUser.token;
      user.firstName = item.primerNombre;
      user.lastName = item.primerApellido;
      user.secondName = item.segundoNombre;
      user.secondLastName = item.segundoApellido;
      user.email = item.email;
      user.dependence = new SelectOption(item.Dependencia.id, item.Dependencia.Descripcion);
      user.position = new SelectOption(item.cargo.id, item.cargo.Descripcion);
      user.phones = item.telefonos;
      user.birthDate = item.fechaNacimiento;
      user.documentType = item.tipoDocumentoIdentidad;
      user.documentNumber = item.numeroDocumento;
      user.status = new SelectOption(item.status.id, item.status.Descripcion);
      user.createAt = item.createAt;
      user.updateAt = item.updateAt;
      user.sex = item.sexo;
      user.address = item.direccion;
      user.country = new SelectOption(item.pais?.id);
      user.state = new SelectOption(item.estado?.id);
      user.city = new SelectOption(item.ciudad?.id);
      return user;
    });
     return  data;
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
    user.phones = resp[0].telefonos;
    const d = new Date(resp[0].fechaNacimiento);
    user.birthDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
    user.documentType = resp[0].tipoDocumentoIdentidad;
    user.documentNumber = resp[0].numeroDocumento;
    user.roles = resp[0].roles.map((item:any)=>{
      return item.rol;
    });
    user.status = new SelectOption(resp[0].status.id, resp[0].status.Descripcion);
    user.avatar = resp[0].foto;
    user.createAt = resp[0].createAt;
    user.updateAt = resp[0].updateAt;
    user.sex = resp[0].sexo;
    user.address = resp[0].direccion;
    user.country = new SelectOption(resp[0].pais.id, resp[0].pais.Nombre);
    user.state = new SelectOption(resp[0].estado.id, resp[0].estado.Nombre);
    user.city = new SelectOption(resp[0].ciudad.id, resp[0].ciudad.Nombre);
    return user;
  }

  /**
   * Delete user by id
   * @param id 
   */
  async deleteUser(id:number){
    const resp = await firstValueFrom(this.delete(environment.apiUrl,`/user/${id}`));
  }

  /**
   * Persists user data
   * @param data 
   */
  async storeUser(data:any){
    try {
      if(data.id){
        const id = data.id;
        delete data.id;
        await firstValueFrom(this.put(environment.apiUrl,`/user/${id}`, data));
        this.toastrService.success('Usuario actualizado con exito.');
      }else{
        await firstValueFrom(this.post(environment.apiUrl,'/user', data));
        this.toastrService.success('Usuario registrado con exito.');
      }
    } catch (error:any) {
      
      console.log(error);
      if (error.status == 409) {
        this.toastrService.error('',error.msg);
      }
      if (error.status != 500) {
        this.toastrService.error('','Ha ocurrido un error. Intente más tarde.');
      }
      
    }    
  }


  async updateProfile(data:any){
    try {
      await firstValueFrom(this.put(environment.apiUrl,`/user/perfil/${data.id}`, data));
      this.toastrService.success('Usuario actualizado con exito.');
    } catch (error:any) {
      console.log(error);
      if (error.status == 409) {
        this.toastrService.error('',error.msg);
      }
      if (error.status != 500) {
        this.toastrService.error('','Ha ocurrido un error. Intente más tarde.');
      }
    }
    
  }

  async mapFromServerObject(item: any): Promise<User> {
    const user = new User();
    user.id = item.id;
    user.username = item.username;
    user.token = this.authService.currentUser.token;
    user.firstName = item.primerNombre;
    user.lastName = item.primerApellido;
    user.secondName = item.segundoNombre;
    user.secondLastName = item.segundoApellido;
    user.email = item.email;
    user.dependence = new SelectOption(item.Dependencia.id, item.Dependencia.Descripcion);
    user.position = new SelectOption(item.cargo.id, item.cargo.Descripcion);
    user.phones = item.telefonos;
    user.birthDate = item.fechaNacimiento;
    user.documentType = item.tipoDocumentoIdentidad;
    user.documentNumber = item.numeroDocumento;
    user.status = new SelectOption(item.status.id, item.status.Descripcion);
    user.createAt = item.createAt;
    user.updateAt = item.updateAt;
    user.sex = item.sexo;
    user.address = item.direccion;
    user.country = new SelectOption(item.pais?.id);
    user.state = new SelectOption(item.estado?.id);
    user.city = new SelectOption(item.ciudad?.id);
    return user;
    
  }


    /**
   * Reset password
   * @param data 
   * @returns 
   */
     async resetPass(data:any):Promise<any>{
      try {
        const resp = await firstValueFrom(this.post(environment.apiUrl, '/user/changepassword/perfil',data));
        this.toastrService.success('','Su password fué cambiado con éxito.');
        return true;
      } catch (error: any) {
        console.log(error)
        if (error.status != 500) {
          this.toastrService.error('','Ha ocurrido un error. Intente más tarde.');
        }
        return false;
      }
      
    }

}


