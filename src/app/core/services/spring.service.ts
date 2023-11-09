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

  obj = {
    primary: "#6571ff",
    secondary: "#7987a1",
    success: "#05a34a",
    info: "#66d1d1",
    warning: "#fbbc06",
    danger: "#ff3366",
    light: "#e9ecef",
    dark: "#060c17",
    muted: "#7987a1",
    gridBorder: "rgba(77, 138, 240, .15)",
    bodyColor: "#000",
    cardBg: "#fff",
    fontFamily: "'Roboto', Helvetica, sans-serif"
  }

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
      const typeItem = data.typeItemId == 1 ? 'Actividad' : data.typeItemId == 2 ? 'Tarea' : 'Error';
      this.toastrService.success(`El elemento de tipo ${typeItem} fue creado con éxito.`);
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
    if (resp.data.nivelboardpanel) {
      itemProject.levelBoardId = +resp.data.idnivelboardpanel_id;
      itemProject.levelBoardName = resp.data.labelnibelboardpanel
    }

    if (resp.data.typeevent) {
      itemProject.itemType = new ItemTypeProject();
      itemProject.itemType.id = resp.data.typeevent.id_typeevent_id;
      itemProject.itemType.label = resp.data.typeevent.label_typeevent;
      itemProject.itemType.icon_class = resp.data.typeevent.icon_class_typeevent;
      itemProject.itemType.color = resp.data.typeevent.color_typeevent;
    }
    if (resp.data.comentarios && resp.data.comentarios.length > 0) {
      itemProject.comments = resp.data.comentarios.map((comment) => {
        Object.assign(comment, { creationDateStr: timeAgo.format(comment.create_at ? new Date(comment.create_at) : new Date()) })
        return comment;
      });

    } else {
      itemProject.comments = [];
    }

    return itemProject;
  }


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

  /**
   * Get Burndown Graphic Data
   * @param id 
   * @returns 
   */
  async getBurndownGraphicData(id: number): Promise<any> {
    let result: any = {};
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/spring/items/burndown', { idSpring: +id }));

      let categories = [];
      let data1 = []; //tiempo remanente esperado
      let data2 = []; // tiempo remanente real
      if (resp && resp.dataBurndown) {
        result.springId = resp.springId,
          result.springName = resp.springName;
        result.startDate = resp.startDate;
        result.endDate = resp.endDate;
        result.totalRemaningMax = resp.totalRemaningMax;
        resp.dataBurndown.map((item) => {
          categories.push(item.date);
          data1.push(item.expectedRemaining);
          data2.push(item.realRemaining)
        })
        result.optionsChart = this.getOptionsChartBurndown(this.obj, { data1, data2 }, categories, result.totalRemaningMax)
      }
      return result;
    } catch (error: any) {
      console.log(error)
      if (error.status == 409) {
        this.toastrService.warning(error.error.msg)
      }
      return null;
    }




  }




  getOptionsChartBurndown(obj: any, source: any, categories: any, totalRemaningMax: number, textLabelyAxis: string = 'Tiempo Remanente') {
    return {
      series: [
        {
          name: "Tiempo Remanente Esperado",
          data: source.data1
        },
        {
          name: "Tiempo Remanente Real",
          data: source.data2
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Burndown',
        align: 'left'
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: categories,
        title: {
          text: 'Días'
        }
      },
      yaxis: {
        title: {
          offsetX: 6,
          offsetY: 0,
          text: 'Tiempo Restante',
          style: {
            fontSize: '12px',
            color: obj.muted
          }
        },
        min: 0,
        max: totalRemaningMax
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

}


