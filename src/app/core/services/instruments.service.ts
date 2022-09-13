import { InputType } from './../models/input-type';
import { PaginationResponse } from './../models/pagination-response';
import { UserService } from './user.service';
import { environment } from './../../../environments/environment';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Instrument } from '../models/instrument';
import { Question } from '../models/question';
import { SelectOption } from '../models/select-option';
import { ToastrService } from 'ngx-toastr';
import { UnitType } from '../models/unit-type';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService extends HttpService {

  // colors and font variables for apex chart 
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


  constructor(protected http: HttpClient,
    private toastrService: ToastrService,
    private userService: UserService) {
    super(http);
  }

  /** INSTRUMENTS **/


  /**
   * Check all instruments, supports pagination and filter
   * @param filter 
   * @returns 
   */
  async getInstrumentsPagined(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/instrumentocaptura/list', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
      const instrument = new Instrument();
      instrument.id = item.id;
      instrument.name = item.nombre;
      instrument.description = item.descripcion;
      instrument.createAt = item.createAt;
      instrument.expirationDate = item.fechaVigencia;
      instrument.publicationDate = item.fechaPublicacion;
      instrument.path = item.path;
      return instrument;
    });

    return paginator;
  }
  /**
   * get pending instruments to answer
   * @param id 
   * @returns 
   */
  async getInstrumentsById(id: number): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/encuesta/instrumentocaptura/${id}`));
    const instrument = new Instrument();
    instrument.id = resp.data[0].id;
    instrument.name = resp.data[0].nombre;
    instrument.description = resp.data[0].descripcion;
    instrument.questions = resp.data[0].pregunta.map((item: any) => {
      const question = new Question();
      question.id = item.id;
      question.label = item.pregunta;
      question.nameImput = 'question-' + item.idInput.Descripcion + '-' + item.id;
      question.order = item.orden;
      question.inputType = new SelectOption(item.idInput.id, item.idInput.Descripcion);
      question.className = item.class;
      question.required = item.obligatorio == 1 ? true : false;
      question.score = item.puntos;
      question.options = item.opciones.map((itemOption: any) => {
        const option = new SelectOption(itemOption.id, itemOption.Name);
        return option;
      });
      return question;
    });
    return instrument;
  }

  /**
   * stores user responses
   * @param data 
   */
  async storeInstrumetsResponse(data: any) {
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/respuesta', data));
      await this.userService.getInfoUser();
      this.toastrService.success('Sus respuestas se han registrado con exito.');
    } catch (error) {
      this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
    }
  }

  /**
   * 
   * @param id 
   */
  async getInstrumentResultByCategory(id: number): Promise<any> {

    const resp = await firstValueFrom(this.get(environment.apiUrl, `/encuesta/resultados/${id}`));

    let results: any[] = [];
    if (resp && resp.usuarios.length > 0) {

      results = resp.usuarios.map((item: any) => {
        const result: any = {};
        result.name = item.nombre;
        const data1 = item.resultado.map((itemData: any) => {
          return {
            x: itemData.categoria,
            y: itemData.puntos
          }
        });
        const data2 = item.resultado.map((itemData: any) => {
          return itemData.puntos;
        });
        const categories = item.resultado.map((itemData: any) => {
          return itemData.categoria;
        });
        result.optionsChart = this.getOptionsChartBarByCategory(this.obj, data2, categories, true);
        return result;
      })

    }

    return results;
  }


  /**
 * 
 * @param id 
 */
  async getInstrumentResultByQuestions(id: number): Promise<any> {

    const resp = await firstValueFrom(this.get(environment.apiUrl, `/encuesta/resultados/sincategoria/${id}`));

    let results: any[] = [];
    if (resp && resp.preguntas.length > 0) {

      results = resp.preguntas.map((item: any) => {
        const result: any = {};
        result.name = item.pregunta;
        const data1 = item.resultado.map((itemData: any) => {
          return {
            x: itemData.opcion,
            y: itemData.total
          }
        });
        const data2 = item.resultado.map((itemData: any) => {
          return itemData.total;
        });
        const categories = item.resultado.map((itemData: any) => {
          return itemData.opcion;
        });
        result.optionsChart = this.getOptionsChartBarByQuestions(this.obj, data2, categories, false);
        return result;
      })

    }

    return results;
  }


  getOptionsChartBarByCategory(obj: any, data: any, categories: any, horizontal: boolean) {
    return {
      series: [{
        data: data,
      }],
      chart: {
        type: 'bar',
        height: '380',
        //parentHeightOffset: 0,
        //foreColor: obj.bodyColor,
        background: obj.cardBg,
        toolbar: {
          show: false
        },
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
        '#f48024', '#69d2e7', '#33b230', '#546E5E'
      ],
      fill: {
        opacity: .9
      },
      grid: {
        padding: {
          bottom: -1
        },
        borderColor: obj.gridBorder,
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        type: 'category',
        categories: categories,
        axisBorder: {
          color: obj.gridBorder,
        },
        axisTicks: {
          color: obj.gridBorder,
        },
      },
      yaxis: {
        title: {
          text: 'Categorias',
          style: {
            size: 9,
            color: obj.muted
          }
        },
        labels: {
          //offsetX: 0,
          show: false
        },
      },
      legend: {
        show: false,
        position: "bottom",
        horizontalAlign: 'center',
        fontFamily: obj.fontFamily,
        itemMargin: {
          horizontal: 8,
          vertical: 0
        },
      },
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        distributed: false,
        style: {
          fontSize: '10px',
          fontFamily: obj.fontFamily,
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        }
      },
      plotOptions: {
        bar: {
          horizontal: horizontal,
          barHeight: '85%',
          distributed: true,
          columnWidth: "50%",
          borderRadius: 4,
          dataLabels: {
            position: 'bottom',
            orientation: 'horizontal',
          }
        },
      }
    }
  }

  getOptionsChartBarByQuestions(obj: any, data: any, categories: any, horizontal: boolean) {
    return {
      series: [{
        data: data,
      }],
      chart: {
        type: 'bar',
        height: '280',
        //parentHeightOffset: 0,
        //foreColor: obj.bodyColor,
        background: obj.cardBg,
        toolbar: {
          show: false
        },
      },
      colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
        '#f48024', '#69d2e7', '#33b230', '#546E5E'
      ],
      fill: {
        opacity: .9
      },
      grid: {
        padding: {
          bottom: -1
        },
        borderColor: obj.gridBorder,
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        type: 'opciones',
        categories: categories,
        axisBorder: {
          color: obj.gridBorder,
        },
        axisTicks: {
          color: obj.gridBorder,
        },
      },
      yaxis: {
        title: {
          text: '',
          style: {
            size: 9,
            color: obj.muted
          }
        },
        labels: {
          offsetX: 4,
          show: false
        },
      },
      legend: {
        show: false,
        position: "bottom",
        horizontalAlign: 'center',
        fontFamily: obj.fontFamily,
        itemMargin: {
          horizontal: 8,
          vertical: 0
        },
      },
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        distributed: true,
        style: {
          fontSize: '10px',
          fontFamily: obj.fontFamily,
        },
        offsetY: 10,
        formatter: function (val, opt) {
          return "Total:  " + val
        }
      },
      plotOptions: {
        bar: {
          horizontal: horizontal,
          barHeight: '50%',
          distributed: true,
          columnWidth: "50%",
          borderRadius: 4,
          dataLabels: {
            position: 'bottom',
            orientation: 'vertical',
          }
        },
      }
    }
  }




  /** INPUT TYPE */

  /**
 * Check all Inputs Type, supports pagination and filter
 * @param filter 
 * @returns 
 */
  async getInputTypesPagined(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/tipoinput/pagined', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
      const inputType = new InputType();
      inputType.id = item.id;
      inputType.label = item.nombre;
      inputType.multipleSelection = item.multiple_seleccion;
      return inputType;
    });

    return paginator;
  }



  /**
   * Query input type by id
   * @param id 
   * @returns 
   */
  async getInputTypeById(id: number): Promise<InputType> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/encuesta/tipoinput/${id}`));
    const input = new InputType();
    input.id = resp[0].id;
    input.label = resp[0].nombre;
    input.multipleSelection = resp[0].multiple_seleccion;
    return input;
  }

  /**
   * Delete Input Type by id
   * @param id 
   */
  async deleteInputType(id: number) {
    //const resp = await firstValueFrom(this.delete(environment.apiUrl,`/user/${id}`));
  }


  /**
* Persists user data
* @param data 
*/
  async storeInputType(data: InputType) {
    try {
      if (data.id) {
        const id = data.id;
        await firstValueFrom(this.put(environment.apiUrl, `/encuesta/tipoinput/actualizar/${id}`, { nombre: data.label.toLowerCase(), seleccionMultiple: data.multipleSelection }));
        this.toastrService.success('Tipo de input actualizado con exito.');
      } else {
        await firstValueFrom(this.post(environment.apiUrl, '/encuesta/tipoinput', { nombre: data.label.toLowerCase(), seleccionMultiple: data.multipleSelection }));
        this.toastrService.success('Tipo de input registrado con exito.');
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


  /** CATEGORIES **/


  /**
  * Check all categories, supports pagination and filter
  * @param filter 
  * @returns 
  */
  async getCategoriesPagined(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/tipocategoria/pagined', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
      const category = new SelectOption(item.id, item.nombre);
      return category;
    });

    return paginator;
  }



  /**
   * Query category by id
   * @param id 
   * @returns 
   */
  async getCategoryById(id: number): Promise<SelectOption> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/encuesta/tipocategoria/${id}`));
    const category = new SelectOption(resp[0].id, resp[0].nombre);
    return category;
  }

  /**
   * Delete category by id
   * @param id 
   */
  async deleteCategory(id: number) {
    //const resp = await firstValueFrom(this.delete(environment.apiUrl,`/user/${id}`));
  }


  /**
* Persists user category
* @param data 
*/
  async storeCategory(data: SelectOption) {
    try {
      if (data.id) {
        const id = data.id;
        await firstValueFrom(this.put(environment.apiUrl, `/encuesta/tipocategoria/actualizar/${id}`, { nombre: data.label.toUpperCase() }));
        this.toastrService.success('Tipo de categoría actualizada con exito.');
      } else {
        await firstValueFrom(this.post(environment.apiUrl, '/encuesta/tipocategoria', { nombre: data.label.toUpperCase() }));
        this.toastrService.success('Tipo de categoría registrada con exito.');
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


  /** UNIT TYPES **/


  /**
  * Check all unit types, supports pagination and filter
  * @param filter 
  * @returns 
  */
  async getUnitTypesPagined(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/tipounidad/pagined', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
      const unitType = new UnitType();
      unitType.id = item.id;
      unitType.label = item.nombre;
      unitType.factor = item.factor;
      return unitType;
    });

    return paginator;
  }



  /**
   * Query unit type by id
   * @param id 
   * @returns 
   */
  async getUnitTypeById(id: number): Promise<UnitType> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/encuesta/tipounidad/${id}`));
    const unitType = new UnitType();
    unitType.id = resp[0].id;
    unitType.label = resp[0].nombre;
    unitType.factor = resp[0].factor;
    return unitType;
  }

  /**
   * Delete category by id
   * @param id 
   */
  async deleteUnitType(id: number) {
    //const resp = await firstValueFrom(this.delete(environment.apiUrl,`/user/${id}`));
  }


  /**
* Persists user Unit Type
* @param data 
*/
  async storeUnitType(data: UnitType) {
    try {
      if (data.id) {
        const id = data.id;
        await firstValueFrom(this.put(environment.apiUrl, `/encuesta/tipounidad/actualizar/${id}`, { nombre: data.label.toLowerCase(), factor: data.factor.toLowerCase() }));
        this.toastrService.success('Tipo de unidad actualizada con exito.');
      } else {
        await firstValueFrom(this.post(environment.apiUrl, '/encuesta/tipounidad', { nombre: data.label.toLowerCase(), factor: data.factor.toLowerCase() }));
        this.toastrService.success('Tipo de unidad registrada con exito.');
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
 * Query users by roles
 * @param id 
 * @returns 
 */
  async getUsersByRoles(roles: any): Promise<Array<any>> {

    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/user/roles', { roles: roles }));
      const users = resp.data.map((item:any)=>{
        return {
          id: item.id,
          fullName: item.nombre+' '+item.apellido,
          role: item.role
        };
      })
      return users;
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
