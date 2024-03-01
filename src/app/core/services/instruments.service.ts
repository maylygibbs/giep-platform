import { QuestionOption } from './../models/question-option';
import { Section } from './../models/section';
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
import * as moment from 'moment';

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

  shuffleArray(inputArray){
    return inputArray.sort(()=> Math.random() - 0.5);
  }

  /** INSTRUMENTS **/

  async storeInstrument(data: any) {
    try {
      if (!data.id) {
        const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/instrumentocaptura', data));
        this.toastrService.success('El instrumento fué creado con éxito.');
      } else {
        const resp = await firstValueFrom(this.put(environment.apiUrl, `/encuesta/instrumentocaptura/actualizar/${data.id}`, data));
        this.toastrService.success('El instrumento fué actualizado con éxito.');
      }

    } catch (error: any) {
      console.log(error)
    }

  }

  /**
 * Publish instrument
 * @param id 
 */
  async publishInstrument(id: string, data: any) {
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/encuesta/instrumentocaptura/publicar/${id}`, data));
      this.toastrService.success('El instrumento fué publicado con éxito.');
    } catch (error: any) {
      console.log(error);
      this.toastrService.error('Ha ocurrido un error eliminando instrumento.');
    }
  }


  async clone(id: number) {
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/encuesta/instrumentocaptura/${id}/clonar`));
      this.toastrService.success('El instrumento fué copiado con éxito.');
    } catch (error: any) {
      this.toastrService.error('Ha ocurrido un error eliminando instrumento.');
    }

  }

  async deleteInstrument(id: number) {
    try {
      const resp = await firstValueFrom(this.delete(environment.apiUrl, `/encuesta/instrumentocaptura/${id}`));
      this.toastrService.success('El instrumento fué eliminado con éxito.');
    } catch (error: any) {

      this.toastrService.error('Ha ocurrido un error eliminando instrumento.');

    }

  }


  /**
   * Check all instruments, supports pagination and filter
   * @param filter 
   * @returns 
   */
  async getInstrumentsPagined(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/instrumentocaptura/list', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    paginator.data = resp.data.map((item: any) => {

      const instrument = new Instrument();
      instrument.id = item.id;
      instrument.name = item.nombre;
      instrument.description = item.descripcion;
      instrument.createAt = item.createAt;
      instrument.expirationDate = item.fechaVigencia;
      instrument.publicationDate = item.fechaPublicacion;
      instrument.isEditable = item.editable == 1 ? true : false;
      instrument.isExpired = moment(instrument.expirationDate).isBefore(moment(currentDate));
      instrument.isPublished = item.publicar && item.publicar == 1 ? true : false;
      instrument.order = item.orden;
      instrument.globalsPoints = item.puntosGlobales ? (item.puntosGlobales = 1 ? true:false) : false;
      instrument.path = '/capture-instruments/results';
      return instrument;
    });

    return paginator;
  }

  /**
   * get pending instruments to answer (final user)
   * @param id 
   * @returns 
   */
  async getInstrumentsById(id: number): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/encuesta/instrumentocaptura/${id}`));
    const instrument = new Instrument();
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    instrument.id = resp.data[0].id;
    instrument.name = resp.data[0].nombre;
    instrument.description = resp.data[0].descripcion;
    instrument.dutation = resp.data[0].duracion;
    instrument.unitType = new SelectOption(resp.data[0].idTipoUnidad.id, resp.data[0].idTipoUnidad.Descripcion);
    instrument.path = resp.data[0].path;
    const d = new Date(resp.data[0].fechaVigencia);
    instrument.expirationDate = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    instrument.isEditable = resp.data[0].editable == 1 ? true : false;
    instrument.isExpired = moment(instrument.expirationDate).isBefore(moment(currentDate));
    instrument.questionsByCategory = resp.data[0].questionsByCategory == 1 ? true : false;
    instrument.roles = resp.data[0].roles;
    if (resp.data[0].users) {
      instrument.users = resp.data[0].users.map((u) => {
        const user = new User();
        user.id = u.id;
        user.firstName = u.nombre;
        user.answered = u.respondida == 1 ? true : false;
        return user;
      })
    }

    instrument.sections = resp.data[0].secciones.map((sectionItem: any) => {

      const section = new Section();
      section.id = sectionItem.id;
      section.name = sectionItem.nombre;
      section.numberSection = sectionItem.orden;
      section.questions = sectionItem.preguntas.map((item: any) => {
        const question = new Question();
        question.id = item.id;
        question.label = item.pregunta;
        question.nameImput = 'question-' + item.idInput.Descripcion + '-' + item.id;
        question.order = item.orden;
        question.inputType = new SelectOption(item.idInput.id, item.idInput.Descripcion);
        question.className = item.class;
        question.required = item.obligatorio == 1 ? true : false;
        question.score = item.puntos;
        question.isReady = true;
        if (item.opciones && item.opciones.length) {
          question.options = item.opciones.map((itemOption: any) => {
            const option = new QuestionOption(itemOption.id, itemOption.Name);
            option.nameInputLabel = "optionLabel" + question.order;
            option.nameInputValue = "optionValue" + question.order;
            option.nameInputScore = "optionScore" + question.order;
            return option;
          });
        }
        if (question.inputType.label == 'checkbox') {
          question.valueRespCheckBox = [];
        }
        return question;
      });

      if(section.questions && section.questions.length>0){
        section.questions = this.shuffleArray(section.questions);
        console.log('shuffleArray',section.questions);
      }

      return section;

    });


    return instrument;
  }

  /**
   * get instruments for update
   * @param id 
   * @returns 
   */
  async getInstrumentsByIdForUpdate(id: number): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/encuesta/instrumentocaptura/${id}`));
    const instrument = new Instrument();
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    instrument.id = resp.data[0].id;
    instrument.name = resp.data[0].nombre;
    instrument.description = resp.data[0].descripcion;
    instrument.dutation = resp.data[0].duracion;
    instrument.unitType = new SelectOption(resp.data[0].idTipoUnidad.id, resp.data[0].idTipoUnidad.Descripcion);
    instrument.path = resp.data[0].path;
    const d = moment(resp.data[0].fechaVigencia).toDate();
    instrument.expirationDate = { year: d.getFullYear(), month: (d.getMonth() + 1), day: d.getDate() };
    instrument.isEditable = resp.data[0].editable == 1 ? true : false;
    instrument.isExpired = moment(instrument.expirationDate).isBefore(moment(currentDate));
    instrument.questionsByCategory = resp.data[0].questionsByCategory == 1 ? true : false;
    instrument.roles = resp.data[0].roles;

    instrument.globalsPoints = resp.data[0].puntosGlobales ? (resp.data[0].puntosGlobales = 1 ? true:false) : false;
    if (resp.data[0].users) {
      instrument.users = resp.data[0].users.map((u: any) => {
        const user = new User();
        user.id = u.id;
        user.firstName = u.nombre;
        user.answered = u.respondida == 1 ? true : false;
        user.roles = u.roles;
        return user;
      })
    }

    instrument.sections = resp.data[0].secciones.map((sectionItem: any) => {

      const section = new Section();
      section.id = sectionItem.id;
      section.name = sectionItem.nombre;
      section.numberSection = sectionItem.orden;
      section.questions = sectionItem.preguntas.map((item: any) => {
        let question = new Question();
        question.id = item.id;
        question.label = item.pregunta;
        question.nameImput = 'question-' + item.idInput.Descripcion + '-' + item.id;
        question.order = item.orden;
        question.inputType = new SelectOption(item.idInput.id, item.idInput.Descripcion);
        question.className = item.class;
        question.required = item.obligatorio == 1 ? true : false;
        question.score = item.puntos;

        if (item.IdCategoria) {
          question.categoryBy = String(item.IdCategoria.id);
        }
        question.isReady = true;
        if (item.opciones && item.opciones.length) {
          question.options = item.opciones.map((itemOption: any, index: number) => {
            let option = new QuestionOption(itemOption.Valor, itemOption.Name);
            option.idOption = itemOption.id;
            option.score = itemOption.Puntos;
            option.nameInputLabel = "optionLabel" + question.order + '' + index;
            option.nameInputValue = "optionValue" + question.order + '' + index;
            option.nameInputScore = "optionScore" + question.order + '' + index;
            return option;
          });
        }

        return question;
      });

      return section;

    });
    return instrument;
  }



  /**
   * Add user to Instrument
   * @param id 
   * @param data 
   */
  async addUsersToInstrument(id: number, data: any) {
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/encuesta/instrumentocaptura/${id}/adduser`, data));
      this.toastrService.success('Los usuarios se han vinculado al instrumento con exito.');
    } catch (error: any) {
      if (error.status != 500)
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
    }
  }




  /**
 * Check all users from instrument, supports pagination and filter
 * @param filter 
 * @returns 
 */
  async getAssignedUsers(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/instrumentocaptura/pagined', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    paginator.data = resp.data.map((item: any) => {

      const user = new User();
      user.id = item.id;
      user.firstName = item.nombre;
      user.email = item.email;
      user.country = new SelectOption(null, item.pais);
      user.state = new SelectOption(null, item.estado);
      user.answered = item.respondida == 1 ? true : false;
      return user;
    });

    return paginator;
  }

  /**
   * Add user to Instrument
   * @param id 
   * @param data 
   */
  async changeOrderOfInstrument(id: number, order: string) {
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/encuesta/instrumentocaptura/${id}/orden/${order}`));
      this.toastrService.success('El orden del instrumento fué actualizado con exito.');
    } catch (error: any) {
      if (error.status != 500)
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
    }
  }

  /**
   * Register hour of init answer
   */
  async registerInitAnswarInstrument(id: string) {
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/encuesta/instrumentocaptura/${id}/iniciar`));

    } catch (error: any) {
      if (error.status != 500)
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
    }
  }


  /**
   * Register hour of init answer
   */
  registerTimeoutInstrument() {
    console.log('TODO: timeout instrument');
    this.toastrService.warning('El tiempo establecido para responder esta encuesta ha terminado. Por favor, complete la encuesta a la brevedad posible y presione "Guardar".')

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
    } catch (error: any) {
      if (error.status != 500)
        this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
    }
  }

  /**
   * Delete question
   * @param id 
   */
  async deleteQuestion(id: string): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.delete(environment.apiUrl, `/encuesta/pregunta/${id}`));
      this.toastrService.success('La Pregunta fue eliminada exitosamente.');
      return true;
    } catch (error) {
      this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      return false;
    }
  }

  /**
 * Delete option
 * @param id 
 */
  async deleteOption(id: number): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.delete(environment.apiUrl, `/encuesta/opciones/${id}`));
      this.toastrService.success('La Opción fue eliminada exitosamente.');
      return true;
    } catch (error) {
      this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      return false;
    }
  }

  /**
* Delete option
* @param id 
*/
  async deleteSection(id: string): Promise<boolean> {
    try {
      const resp = await firstValueFrom(this.delete(environment.apiUrl, `/encuesta/seccion/${id}`));
      this.toastrService.success('La Sección fue eliminada exitosamente.');
      return true;
    } catch (error) {
      this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      return false;
    }
  }




  /**
 * Check all instruments, supports pagination and filter
 * @param filter 
 * @returns 
 */
  async getInstrumentResultsPagined(filter: any, instrumentId: number, selectedGraphic: string,  globalsPoints: boolean): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, `/encuesta/resultados/instrumento/${instrumentId}`, filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    if (resp && resp.entidades?.length > 0) {
      paginator.sample = resp.muestra ? resp.muestra : 0;
      paginator.data = resp.entidades.map((item: any) => {
        const result: any = {};
        result.name = item.entidad;
        result.dateResponse = item.fecha_inicio;
        result.country = item.pais;
        if(!globalsPoints){
          if(filter.byuser=='2' || filter.byuser=='3'){
            if(filter.estado || filter.ciudad){
              result.state = item.estado;
              result.city = item.ciudad;
            }
          }else{
            result.state = item.estado;
            result.city = item.ciudad;
          }
        }else{
          if(filter.byuser=='0'){
            if(filter.estado || filter.ciudad){
              result.state = item.estado;
              result.city = item.ciudad;
            }
          }else{
            result.state = item.estado;
            result.city = item.ciudad;
          }
        }

        result.sex = item.sexo;
        result.charge = item.cargo;
        result.dependence = item.dependencia;
        result.management = item.gerencia;
        result.coordination = item.coordinacion;
        if(!globalsPoints){
          result.adecuacyLevel = item.totales.adecuacyLevel;
        }
        
        if (item.fecha_inicio) {
          if (!item.resultado || item.resultado.length == 0) {
            result.warning = 'Inició el instrumento, sin embargo no culminó.';
          } else {
            if (item.resultado && item.resultado.length > 0) {
              result.warning = 'Resultados';
            }
          }
        } else {
          if (!item.resultado || item.resultado.length == 0) {
            result.warning = 'Sin resultados';
          } else {
            if (item.resultado && item.resultado.length > 0) {
              result.warning = 'Resultados';
            }
          }
        }


        const source = [];
        let data = item.resultado?.map((itemData: any) => {
          return itemData.value;
        });
        source.push({data: data, name:'Nivel demostrado'});
        if(!globalsPoints){
          data = item.resultado?.map((itemData: any) => {
            return itemData.levelRequired;
          })
          source.push({data: data, name:'Nivel requerido'});
        }

        const data2 = item.resultado?.map((itemData: any) => {
          return parseInt(itemData.value);
        });
        const categories = item.resultado.map((itemData: any) => {
          return itemData.label;
        });

        if(!globalsPoints){
          if(item.resultado){
            result.quantityUsers = item.resultado[0].cantidadPersonas
          }
        }

        if(!globalsPoints){
          result.tableResult = item.resultado.map((itemData: any) => {
            return {
              competence: itemData.label,
              value:itemData.value,
              levelRequired: itemData.levelRequired,
              porcenageWeighing: itemData.porcenageWeighing,
              gap:itemData.gap,
              weightedRequirement: itemData.weightedRequirement,
              weightedLevel: itemData.weightedLevel,
              weightPerGap: itemData.weightPerGap,
              dif:itemData.DIF
            }
          });
        }


        switch (selectedGraphic) {

          case '1':
            if(globalsPoints){
              result.optionsChart = this.getOptionsChartBar(this.obj, source, categories, true);
            }else{
              result.optionsChart = this.getOptionsChartBarGrouped(this.obj, source, categories, true);
            }
            break;
          case '2':
            if(globalsPoints){
              result.optionsChart = this.getOptionsChartBar(this.obj, source, categories, false);
            }else{
              result.optionsChart = this.getOptionsChartBarGrouped(this.obj, source, categories, false);
            }
            break;
          case '3':
            result.optionsChart = this.getOptionsChartPie(this.obj, data2, categories);
            break;
          case '4':
            result.optionsChart = this.getOptionsChartLine(this.obj, source, categories);
            break;

          default:
            break;
        }

        return result;
      })

    } else {
      paginator.data = null;
    }
    return paginator;
  }

  /**
   * Generate chart type: Bar
   * @param obj 
   * @param data1 
   * @param data2 
   * @param categories 
   * @param horizontal 
   * @param textLabelyAxis 
   * @returns 
   */
  getOptionsChartBar(obj: any, source: any, categories: any, horizontal: boolean, textLabelyAxis: string = 'Categorias') {
    return {
      series: source,
      chart: {
        type: 'bar',
        height: horizontal ? '480' : '380',
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
        labels: {
          show: horizontal ? true : false,
        },

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
          text: textLabelyAxis,
          style: {
            size: 9,
            color: obj.muted
          }
        },
        labels: {
          offsetX: 0,
          show: horizontal ? false : true,
          style: {
            fontSize: '8px',


          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: 'left',
        fontFamily: obj.fontFamily,
        itemMargin: {
          horizontal: 8,
          vertical: 5
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
          //return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          return val
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
            orientation: horizontal ? 'horizontal' : 'vertical',
          }
        },
      }
    }
  }

  getOptionsChartBarGrouped(obj: any, source: any, categories: any, horizontal: boolean, textLabelyAxis: string = 'Categorias') {
    return {
      series: source,
      chart: {
        type: 'bar',
        height: horizontal ? '480' : '380',
        background: obj.cardBg,
        toolbar: {
          show: false
        },
      },
      xaxis: {
        categories: categories,
        labels:{
          style:{
            fontSize:'8px'
          }
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      legend: {
        show: true,
        position: horizontal ? "bottom" : "top",
        horizontalAlign: 'left',
        fontFamily: obj.fontFamily,
        itemMargin: {
          horizontal: 8,
          vertical: 5
        },
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
          //return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          return val
        }
      },
      plotOptions: {
        bar: {
          horizontal: horizontal,
          barHeight: '85%',
          columnWidth: "50%",
          borderRadius: 4,
          dataLabels: {
            position: 'bottom',
            orientation: horizontal ? 'horizontal' : 'vertical',
          }
        },
      },
    }
  }

  /**
   * Generate chart type: Pie
   * @param obj 
   * @param data2 
   * @param categories 
   * @param horizontal 
   * @param textLabelyAxis 
   * @returns 
   */
  getOptionsChartPie(obj: any, data3: any, categories: any, chartType: string = 'pie') {
    console.log(data3)
    console.log(categories)
    return {
      series: data3,
      labels: categories,
      chart: {
        width: 590,
        type: chartType
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%'
          }
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: 'left',
        fontFamily: obj.fontFamily,
        itemMargin: {
          horizontal: 8,
          vertical: 5
        },
      }

    };
  }


  /**
   * Generate chart type: Pie
   * @param obj 
   * @param data2 
   * @param categories 
   * @param horizontal 
   * @param textLabelyAxis 
   * @returns 
   */
  getOptionsChartLine(obj: any, source: any, categories: any, chartType: string = 'area') {
    console.log('soruce', source)
    return {
      series: source,
      chart: {
        height: 350,
        type: chartType,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '10px',
          fontFamily: obj.fontFamily,
        },
        formatter: function (val, opt) {
          //return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          return val
        }
      },
      stroke: {
        curve: 'straight'
      },
      xaxis: {
        categories: categories,        
        labels:{
          style:{
            fontSize:'8px'
          }
        }
      },
      yaxis: {
        opposite: true
      },
      legend: {
        position: "top",
        horizontalAlign: 'center'
      }

    };
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

  getOptionsChartBarByCounter(obj: any, data: any, categories: any, horizontal: boolean) {
    return {
      series: [{
        data: data,
      }],
      chart: {
        type: 'bar',
        height: '180',
        //parentHeightOffset: 0,
        //foreColor: obj.bodyColor,
        background: obj.cardBg,
        toolbar: {
          show: false
        },
      },
      colors: ['#33b230', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#33b2df', '#f9a3a4', '#90ee7e',
        '#f48024', '#69d2e7', '#2b908f', '#546E5E'
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
            size: 12,
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
          fontSize: '12px',
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
      inputType.status = new SelectOption(item.status?.statusId, item.status?.labelStatus);
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
    input.status = new SelectOption(resp[0].status?.statusId, resp[0].status?.labelStatus);
    return input;
  }

  /**
   * Delete Input Type by id
   * @param id 
   */
  async deleteInputType(id: number) {
    const resp = await firstValueFrom(this.delete(environment.apiUrl, `/encuesta/tipoinput/${id}`));
    if (resp && resp.msg) {
      this.toastrService.success('Tipo de input elimando con éxito.');
    }
  }


  /**
* Persists user data
* @param data 
*/
  async storeInputType(data: InputType) {
    try {
      if (data.id) {
        const id = data.id;
        await firstValueFrom(this.put(environment.apiUrl, `/encuesta/tipoinput/actualizar/${id}`, { nombre: data.label.toLowerCase(), seleccionMultiple: data.multipleSelection, statusId: parseInt(data.status.value) }));
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
      category.status = new SelectOption(item.status?.statusId, item.status?.labelStatus);
      category.flag = item.escalaPonderacion == 1 ? true : false;
      return category;
    });

    return paginator;
  }



  /**
   * Query category by id
   * @param id 
   * @returns 
   */
  async getCategoryById(id: number, charges: Array<SelectOption>, levels:Array<SelectOption>): Promise<SelectOption> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/encuesta/tipocategoria/${id}`));
    const category = new SelectOption(resp[0].id, resp[0].nombre);
    category.status = new SelectOption(resp[0].status?.statusId, resp[0].status?.labelStatus);
    category.flag = resp[0].escalaPonderacion == 1 ? true : false;
    if(category.flag){
      if(resp[0].escalas){
        category.scales = charges.map((item:SelectOption,index:number)=>{
          const configScale = resp[0].escalas.filter((scale:any)=>{ return scale.idCargo == parseInt(item.value)});
          if(configScale.length > 0){
            return {
              id: item.value,
              label: item.label,
              scaleNumber: configScale[0].escala,
              nameControlScale: 'controlScaleCharge-'+index
            }
          }else{
            return {
              id: item.value,
              label: item.label,
              scaleNumber: 0,
              nameControlScale: 'controlScaleCharge-'+index
            }
          }

        });
      }
      if(resp[0].ponderaciones){
        category.weights = levels.map((item:SelectOption,index:number)=>{
          const configWeighing = resp[0].ponderaciones.filter((weighing:any)=>{ return weighing.idNivel == parseInt(item.value)});
          if(configWeighing.length > 0){
            return {
              id: item.value,
              label: item.label,
              weighingNumber: configWeighing[0].ponderacion,
              nameControlWeighing: 'controlWeighingLevel-'+index
            }
          }else{
            return {
              id: item.value,
              label: item.label,
              weighingNumber: 0,
              nameControlWeighing: 'controlWeighingLevel-'+index
            }
          }

        });
      }
    }
    return category;
  }

  /**
   * Delete category by id
   * @param id 
   */
  async deleteCategory(id: number) {
    const resp = await firstValueFrom(this.delete(environment.apiUrl, `/encuesta/tipocategoria/${id}`));
    if (resp) {
      this.toastrService.success('Tipo de categoría elimando con éxito.');
    }
  }


  /**
* Persists user category
* @param data 
*/
  async storeCategory(data: SelectOption) {
    try {
      let body = { 
        nombre: data.label.toUpperCase(), 
        statusId: parseInt(data.status.value),
        escalaPonderacion: data.flag ? 1 : 0,
        escalas:  data.flag ? data.scales.map((item)=> {return {idCargo:parseFloat(item.id), escala:parseFloat(item.scaleNumber)}}) : null,
        ponderaciones: data.flag ? data.weights.map((item)=> {return {idNivel:parseFloat(item.id), ponderacion:parseFloat(item.weighingNumber)}}) : null
      }
      if (data.id) {
        const id = data.id;
        console.log('category', body);
        await firstValueFrom(this.put(environment.apiUrl, `/encuesta/tipocategoria/actualizar/${id}`, body));
        this.toastrService.success('Tipo de categoría actualizada con exito.');
      } else {
        delete body.statusId;
        console.log('category', body);
        await firstValueFrom(this.post(environment.apiUrl, '/encuesta/tipocategoria', body));
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
      unitType.status = new SelectOption(item.status?.statusId, item.status?.labelStatus);
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
    unitType.status = new SelectOption(resp[0].status?.statusId, resp[0].status?.labelStatus);
    return unitType;
  }

  /**
   * Delete category by id
   * @param id 
   */
  async deleteUnitType(id: number) {
    const resp = await firstValueFrom(this.delete(environment.apiUrl, `/encuesta/tipounidad/${id}`));
    if (resp) {
      this.toastrService.success('Tipo de unidad elimando con éxito.');
    }
  }


  /**
* Persists user Unit Type
* @param data 
*/
  async storeUnitType(data: UnitType) {
    try {
      if (data.id) {
        const id = data.id;
        await firstValueFrom(this.put(environment.apiUrl, `/encuesta/tipounidad/actualizar/${id}`, { nombre: data.label.toLowerCase(), factor: data.factor.toLowerCase(), statusId: parseInt(data.status.value) }));
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
      const users = resp.data.map((item: any) => {
        return {
          id: item.id,
          fullName: `${item.nombre} ${item.apellido} ( ${item.email} )`,
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


  /**
   * Check all users, supports pagination and filter
   * @param filter 
   * @returns 
   */
  async getUsersByInstrumentPaginated(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/instrumentocaptura/users', filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
      const user = new User();
      user.instrument = new Instrument();
      user.instrument.id = item.id;
      user.instrument.name = item.nombre;
      user.instrument.answered = item.respondida;
      user.instrument.answeredDate = item.fecha;
      user.username = item.username;
      user.firstName = item.primerNombre;
      user.lastName = item.primerApellido;
      user.email = item.email;

      return user;
    })
    return paginator;
  }


/**
 * Call download result service
 * @param filter 
 * @returns 
 */
    async resultDownload(filter: any, instrumentId: number): Promise<Blob> {
      const resp = await firstValueFrom(this.post(environment.apiUrl, `/encuesta/descarga/resultados/instrumento/${instrumentId}`, filter, { responseType: 'blob' }));

      return resp;
    }
  


}
