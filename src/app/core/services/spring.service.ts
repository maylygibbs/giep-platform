import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Board, ItemProject, ItemTypeProject } from '../models/item-project';
import { LevelBoardProject } from '../models/level-board-project';
import TimeAgo from 'javascript-time-ago'
// Spanish.
import es from 'javascript-time-ago/locale/es'
TimeAgo.addDefaultLocale(es)

@Injectable({
  providedIn: 'root'
})
export class SpringService extends HttpService {

  private instruments: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);

  constructor(protected http: HttpClient,
    private toastrService: ToastrService) {
    super(http);
  }

  /**
   * Lets create spring
   * @param data 
   * @returns 
   */
  async storeSpring(data: any) {
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/spring', data));
      this.toastrService.success('El spring se ha registrado con éxito.');
      return true;
    } catch (error: any) {
      console.log('error', error)
      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;

    }
  }


  /**
 * Get Items Board by Spring id
 * @param idSpring 
 */
  async getItemsBoardBySpring(idSpring: number, columns: Array<LevelBoardProject>): Promise<Board> {


    let board = new Board();
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/spring/activities/${idSpring}`));
      board.springId = +resp.data.springId;
      board.springName = resp.data.springName;
      board.startDate = resp.data.startDate;
      board.endDate = resp.data.endDate;
      if (resp.data.activities) {
        board.activities = resp.data.activities.map((item) => {
          const activity = new ItemProject();

          activity.itemId = +item.itemId;
          activity.name = item.name;
          activity.assignedId = item.assignedId;
          activity.assignedName = item.assignedName;
          activity.avatar = item.avatar;
          activity.itemType = item.itemType;
          activity.order = item.order;
          activity.hours = item.hours;
          activity.levelBoardId = +item.nivelboardpanelId;
          if (item.tasks && !Array.isArray(item.tasks)) {
            activity.tasks = {};
            columns.forEach((column: LevelBoardProject) => {
              if (item.tasks[column.attr_key]) {
                activity.tasks[column.attr_key] = item.tasks[column.attr_key];
              } else {
                activity.tasks[column.attr_key] = new Array<ItemProject>();
              }
            });
          } else {
            activity.tasks = {};
            columns.forEach((column: LevelBoardProject) => {
              activity.tasks[column.attr_key] = new Array<ItemProject>();
            });
          }

          return activity
        })
      } else {
        board.activities = new Array<ItemProject>();
      }
      return board;
    } catch (error: any) {
      console.log('error', error)
      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return board;
    }

  }


  /**
   * Create item
   * @param data 
   * @returns 
   */
  async createItem(data: any): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/spring/items', data));

      this.toastrService.success(`El elemento de tipo xxxx fue creado con éxito.`);
      return true;
    } catch (error: any) {

      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;

    }
  }


  /**
 * Update position
 * @param data 
 * @returns 
 */
  async updatePositionItem(data: any): Promise<boolean> {

    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, '/spring/items/actualizarposiciontareas', data));

      this.toastrService.success(`La tarea fue actualizada con éxito.`);
      return true;
    } catch (error: any) {

      if (error.status == 409) {
        this.toastrService.error('', error.error.msg);
      }
      if (error.status != 500 && error.status != 409) {
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
      return false;
    }
  }


  /**
  * Query project by id
  * @param id 
  * @returns 
  */
  async getItemProjectById(id: number): Promise<ItemProject> {
    const timeAgo = new TimeAgo('es-ES');
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/spring/detalles/item/${id}`));
    let itemProject = new ItemProject();
    itemProject.itemId = +resp.data['id'];
    itemProject.name = resp.data.titulo;
    itemProject.assignedId = +resp.data.id_user_id;
    itemProject.assignedName = resp.data.user_full_name;
    itemProject.avatar = resp.data.user_avatar;
    itemProject.parentId = +resp.data.id_backlog_padre_id; 
    itemProject.hours = +resp.data.peso;
    itemProject.description = resp.data.descripcion;
    if(resp.data.nivelboardpanel){
      itemProject.levelBoardId = +resp.data.idnivelboardpanel_id;
      itemProject.levelBoardName = resp.data.labelnibelboardpanel
    }

    if(resp.data.typeevent){
      itemProject.itemType = new ItemTypeProject();
      itemProject.itemType.id = resp.data.typeevent.id_typeevent_id;
      itemProject.itemType.label = resp.data.typeevent.label_typeevent;
      itemProject.itemType.icon_class = resp.data.typeevent.icon_class_typeevent;
      itemProject.itemType.color = resp.data.typeevent.color_typeevent;
    } 
    if(resp.data.comentarios && resp.data.comentarios.length>0){
      itemProject.comments = resp.data.comentarios.map((comment)=>{
        Object.assign(comment, {creationDateStr: timeAgo.format(comment.create_at ? new Date(comment.create_at) : new Date())})
        return comment;
      });
      
    }else{
      itemProject.comments = [];
    }
        
    return itemProject;
  }


  //https://bofficegiepstage.pafar.com.ve/public/api/spring/items/actualizardetallesitems

    /**
 * Update info item
 * @param data 
 * @returns 
 */
    async updateInfoItem(data: any): Promise<boolean> {

      try {
        const resp = await firstValueFrom(this.put(environment.apiUrl, '/spring/items/actualizardetallesitems', data));
  
        this.toastrService.success(`La tarea fue actualizada con éxito.`);
        return true;
      } catch (error: any) {
  
        if (error.status == 409) {
          this.toastrService.error('', error.error.msg);
        }
        if (error.status != 500 && error.status != 409) {
          this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
        }
        return false;
      }
    }

}


