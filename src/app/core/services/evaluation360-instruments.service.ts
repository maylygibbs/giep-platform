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
import { Instrument } from '../models/evaluation-instrument';
import { Question } from '../models/question';
import { SelectOption } from '../models/select-option';
import { ToastrService } from 'ngx-toastr';
import { UnitType } from '../models/unit-type';
import { User } from '../models/user';
import * as moment from 'moment';
import { CompetencyUnit } from '../models/competency-unit';


@Injectable({
  providedIn: 'root'
})
export class Evaluation360InstrumentsService extends HttpService{

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
        const resp = await firstValueFrom(this.post(environment.apiUrl, '/instrumento360', data));
        this.toastrService.success('El instrumento fué creado con éxito.');
      } else {
        const resp = await firstValueFrom(this.put(environment.apiUrl, `/instrumento360/actualizar/${data.id}`, data));
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
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/instrumento360/publicar/${id}`, data));
      this.toastrService.success('El instrumento fué publicado con éxito.');
    } catch (error: any) {
      console.log(error);
      this.toastrService.error('Ha ocurrido un error eliminando instrumento.');
    }
  }


  async clone(id: number) {
    try {
      const resp = await firstValueFrom(this.get(environment.apiUrl, `/instrumento360/${id}/clonar`));
      this.toastrService.success('El instrumento fué copiado con éxito.');
    } catch (error: any) {
      this.toastrService.error('Ha ocurrido un error eliminando instrumento.');
    }

  }

  async deleteInstrument(id: number) {
    try {
      const resp = await firstValueFrom(this.delete(environment.apiUrl, `/instrumento360/${id}`));
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
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/instrumento360/pagined', filter));
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
      if(item.tipoInstrumento){
        instrument.instrumentType = new SelectOption(item.tipoInstrumento.id, item.tipoInstrumento.Nombre);
      }
      return instrument;
    });

    return paginator;
  }

  /**
   * get instruments for update
   * @param id 
   * @returns 
   */
  async getInstrumentsByIdForUpdate(id: number): Promise<any> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/instrumento360/${id}`));
    const instrument = new Instrument();
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    instrument.id = resp.data[0].id;
    instrument.name = resp.data[0].nombre;
    instrument.description = resp.data[0].descripcion;
    instrument.dutation = resp.data[0].duracion;
    instrument.unitType = new SelectOption(resp.data[0].tipounidad.id, resp.data[0].tipounidad.Descripcion);
    instrument.instrumentType = new SelectOption(resp.data[0].tipoInstrumento.id, resp.data[0].tipoInstrumento.Descripcion);
    instrument.path = resp.data[0].path;
    const d = new Date(resp.data[0].fechaVigencia);
    instrument.expirationDate = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    instrument.isEditable = resp.data[0].editable == 1 ? true : false;
    instrument.isExpired = moment(instrument.expirationDate).isBefore(moment(currentDate));
    instrument.globalsPoints = resp.data[0].puntosGlobales ? (resp.data[0].puntosGlobales == 1 ? true:false) : false;
    instrument.questionsByCategory = resp.data[0].questionsByCategory == 1 ? true : false;
    instrument.roles = resp.data[0].roles || [];

    instrument.evaluator = new User();
    instrument.evaluator.id = resp.data[0].evaluatorUserId;
    instrument.evaluator.firstName = resp.data[0].evaluatorFullName;
    instrument.evaluator.email = resp.data[0].evaluatorEmail;

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
        if (item.IdCategoria) {
          question.categoryBy = String(item.IdCategoria.id);
        }
        if(item.Competencia360 && item.Competencia360.id){
          question.categoryBy = String(item.Competencia360.id);
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
   * get pending instruments to answer (final user) renderizacion
   * @param id 
   * @returns 
   */  
  async getInstrumentsById(id: number): Promise<any> { // TODO: CAMBIAR RUTA DE ENDPOINT
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/instrumento360evaluacion/${id}`));

    if (!resp?.data || !Array.isArray(resp.data) || resp.data.length === 0) {
      this.toastrService.error('', 'No se encontró el instrumento de evaluación.');
      throw new Error('Instrumento no encontrado');
    }

    const data = resp.data[0];
    const instrument = new Instrument();
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    instrument.id = data.id;
    instrument.name = data.nombre;
    instrument.description = data.descripcion;
    instrument.dutation = data.duracion;
    instrument.unitType = new SelectOption(data.idTipoUnidad?.id, data.idTipoUnidad?.Descripcion);
    instrument.path = data.path;
    const d = moment(data.fechaVigencia).toDate();
    instrument.expirationDate = { year: d.getFullYear(), month: (d.getMonth() + 1), day: d.getDate() };
    instrument.isEditable = data.editable == 1 ? true : false;
    instrument.isExpired = moment(instrument.expirationDate).isBefore(moment(currentDate));
    instrument.questionsByCategory = data.questionsByCategory == 1 ? true : false;
    instrument.roles = data.roles;

    instrument.evaluator = new User();
    instrument.evaluator.id = data.evaluatorUserId;
    instrument.evaluator.firstName = data.evaluatorFullName;
    instrument.evaluator.email = data.evaluatorEmail;

    instrument.globalsPoints = data.puntosGlobales ? (data.puntosGlobales == 1 ? true : false) : false;
    if (data.users) {
      const usersIfEvaluating = data.users.filter((user: any) => user.respondida == 0);
      if (usersIfEvaluating.length > 0) {
        instrument.users = usersIfEvaluating.map((u: any) => {
          const user = new User();
          user.id = u.usuarioId;
          user.firstName = u.nombre;
          user.email = u.email;
          user.answered = u.respondida == 1 ? true : false;
          user.roles = u.roles;
          if(u.cargoId && u.cargoNombre){
            user.position = new SelectOption(u.cargoId, u.cargoNombre);
          }
          if(u.unidad){
            user.unit = new SelectOption(u.unidad.id, u.unidad.label);
          }
          return user;
        });
      }
    }

    return instrument;
  }

  /**
   * Get sections for instrument by user
   * @param userId 
   * @param instrumentoId 
   * @returns Sections mapped to frontend model (name, questions with label, inputType, options)
   */
  async getInstrumentSections(userId: number, instrumentoId: number): Promise<Section[]> {
    try {
      const payload = {
        userId: userId,
        instrumentoId: instrumentoId
      };
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/instrumento360/secciones', payload));
      const rawSecciones = resp && resp.secciones ? resp.secciones : [];
      return rawSecciones.map((sectionItem: any) => {
        const section = new Section();
        section.id = sectionItem.id != null ? String(sectionItem.id) : sectionItem.id;
        section.name = sectionItem.nombre != null ? sectionItem.nombre : (sectionItem.name || '');
        section.numberSection = sectionItem.orden != null ? +sectionItem.orden : (sectionItem.numberSection ?? 0);
        section.questions = (sectionItem.preguntas || []).map((item: any) => {
          const question = new Question();
          question.id = item.id != null ? String(item.id) : item.id;
          question.label = item.pregunta != null ? item.pregunta : (item.label || '');
          
          const inputDesc = item.idInput?.Descripcion ?? item.inputType?.label ?? 'text';
          const inputId = item.idInput?.id ?? item.inputType?.value ?? item.inputType?.id;

          question.nameImput = `question-${item.idInput.Descripcion}-${item.id}-${userId}-${sectionItem.id}`;
          question.order = item.orden != null ? item.orden : (item.order ?? 0);
          question.inputType = new SelectOption(item.idInput.id, item.idInput.Descripcion);
          question.className = item.class;
          question.required = item.obligatorio == 1 ? true : false;
          question.score = item.puntos;
          if (item.IdCategoria) question.categoryBy = String(item.IdCategoria.id);
          if (item.Competencia360 && item.Competencia360?.id) {
            question.description = item.Competencia360.Descripcion2;
            question.categoryBy = String(item.Competencia360.id);
          }
            
          question.isReady = true;
          if (item.opciones && item.opciones.length) {
            question.options = item.opciones.map((itemOption: any, index: number) => {
              let option = new QuestionOption(itemOption.id, itemOption.Name);
              option.nameInputLabel = `optionLabel-${question.order}-${question.id }-${userId}-${sectionItem.id}`;
              option.nameInputValue = `optionValue-${question.order}-${question.id }-${userId}-${sectionItem.id}`;
              option.nameInputScore = `optionScore-${question.order}-${question.id }-${userId}-${sectionItem.id}`;
              return option;
            });
          }
          return question;
        });
        if (section.questions && section.questions.length > 0) {
          section.questions = this.shuffleArray(section.questions);
        }
        return section;
      });

    } catch (error: any) {
      console.log(error);
      if (error.status != 500) {
        this.toastrService.error('', 'Ha ocurrido un error obteniendo las secciones. Intente más tarde.');
      }
      throw error;
    }
  }

  /**
   * Add user to Instrument
   * @param id 
   * @param data 
   */
  async addUsersToInstrument(id: number, data: any) {
    try {
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/evaluacion/instrumentoevaluacion/${id}/adduser`, data));
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
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/evaluacion/instrumentoevaluacion/pagined', filter));
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
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/evaluacion/instrumentoevaluacion/${id}/orden/${order}`));
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
      const resp = await firstValueFrom(this.put(environment.apiUrl, `/evaluacion/instrumentoevaluacion/${id}/iniciar`));

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
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/evaluacion/respuesta', data));
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
      const resp = await firstValueFrom(this.delete(environment.apiUrl, `/instrumento360/pregunta/${id}`));
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
  async deleteOption(id: number): Promise<boolean> { //TODO: 2025-06-24 integrar con nuevo endpoint
    try {
      const resp = await firstValueFrom(this.delete(environment.apiUrl, `/instrumento360/opcion/${id}`));
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
      const resp = await firstValueFrom(this.delete(environment.apiUrl, `/instrumento360/seccion/${id}`));
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
    const resp = await firstValueFrom(this.post(environment.apiUrl, `/evaluacion/resultados/instrumento/${instrumentId}`, filter));
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


  /** CATEGORIES 360 **/


  /**
  * Check all categories 360, supports pagination and filter
  * @param filter 
  * @returns 
  */
  async getCategoriesPagined(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/instrumento360/competencia/pagined', filter));
    console.log('resp getCategoriesPagined', resp);
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.data = resp.data.map((item: any) => {
      const category = new SelectOption(item.id, item.nombre);
      category.status = new SelectOption(item.status?.statusId, item.status?.labelStatus);
      category.flag = item.escalaPonderacion == 1 ? true : false;
      category.description = item.descripcion;
      category.type = item.tipo;
      return category;
    });

    return paginator;
  }



  /**
   * Query category 360 by id
   * @param id 
   * @returns 
   */
  async getCategoryById(id: number, charges: Array<SelectOption>, levels:Array<SelectOption>): Promise<SelectOption> {
    const resp = await firstValueFrom(this.get(environment.apiUrl, `/instrumento360/competencia/${id}`));
    const category = new SelectOption(resp[0].id, resp[0].nombre);
    category.status = new SelectOption(resp[0].status?.statusId, resp[0].status?.labelStatus);
    category.flag = resp[0].escalaPonderacion == 1 ? true : false;
    category.description = resp[0].descripcion;
    category.type = {value: resp[0].tipo, label: resp[0].tipo};
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
      console.log('data >>>', data);
      let body = { 
        nombre: data.label.toUpperCase(),
        tipo: data.type ? data.type.value : null,
        descripcion: data.description,
        escalaPonderacion: data.flag ? 1 : 0,
        escalas: data.flag ? data.scales.map((item)=> {return {idCargo:parseFloat(item.id), escala:parseFloat(item.scaleNumber)}}) : null,
        ponderaciones: data.flag ? data.weights.map((item)=> {return {idNivel:parseFloat(item.id), ponderacion:parseFloat(item.weighingNumber)}}) : null
      }
      console.log('body', body);
      if (data.id) {
        const id = data.id;
        console.log('category', body);
        await firstValueFrom(this.put(environment.apiUrl, `/instrumento360/competencia/${id}`, body));
        this.toastrService.success('Tipo de categoría actualizada con exito.');
      } else {
        console.log('category', body);
        await firstValueFrom(this.post(environment.apiUrl, '/instrumento360/competencia', body));
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
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/evaluacion/instrumentoevaluacion/users', filter));
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


  /**
   * Check all instruments, supports pagination and filter
   * @param filter 
   * @returns 
   */
  async getInstrumentsByEvaluatorPagined(filter: any): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, '/instrumento360/pagined1', filter));
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
      instrument.instrumentType = new SelectOption(item.tipoInstrumento.id, item.tipoInstrumento.Nombre);
      instrument.globalsPoints = item.puntosGlobales ? (item.puntosGlobales == 1 ? true:false) : false;
      instrument.userIfEvaluating = item.userIfEvaluating;
      instrument.users = Array.isArray(item.users) && item.users.length > 0 ? item.users : null;
      if(item.tipoInstrumento){
        instrument.instrumentType = new SelectOption(item.tipoInstrumento.id, item.tipoInstrumento.Nombre);
      }
      return instrument;
    });

    return paginator;
  }   
  
    /**
   * stores user responses
   * @param data 
   */
    async storeUsersEvaluationResponse(data: any) {
      try {
        const resp = await firstValueFrom(this.post(environment.apiUrl, '/evaluacion/respuesta', data));
        this.toastrService.success('La evaluación ha sido registrada satisfactoriamente.');
      } catch (error: any) {
        if (error.status != 500)
          this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
    }

    /**
     * Delete users from instrument
     * @param data 
     */
    async usersDelete(data:any){
      try {
        const resp = await firstValueFrom(this.post(environment.apiUrl, '/encuesta/instrumentoevaluacion/desvincularusers', data));
        this.toastrService.success('Los usuarios han sido eliminados con éxito.');
      } catch (error: any) {
        if (error.status != 500)
          this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
    }



      /** COMPETENCIES UNIT CHARGE DOMAIN 360 **/

    // Servicios para CompetencyUnit
    async getCompetencyUnitsPagined(filter: any): Promise<PaginationResponse> {
      const resp = await firstValueFrom(this.post(environment.apiUrl, '/instrumento360/competencia/cargo/unidad/pagined', filter));
      const paginator = new PaginationResponse(filter.page, filter.rowByPage);
      paginator.count = resp.count;
      paginator.data = resp.data.map((item: any) => {
        const competencyUnit = new CompetencyUnit();
        competencyUnit.id = item.id;
        competencyUnit.charge = new SelectOption(item.cargo.id, item.cargo.label);
        competencyUnit.domainLevel = new SelectOption(item.dominio.id, item.dominio.label);
        competencyUnit.competency = new SelectOption(item.competencia.id, item.competencia.label);
        competencyUnit.unit = new SelectOption(item.unidad.id, item.unidad.label);
        competencyUnit.priority = item.prioridad;  
        return competencyUnit;
      })


      return this.resolveWith(paginator);
    }

    async getCompetencyUnitById(id: number): Promise<CompetencyUnit> {
        const competencyUnit = new CompetencyUnit();
        const resp = await firstValueFrom(this.get(environment.apiUrl, `/instrumento360/competencia/cargo/unidad/${id}`));
        competencyUnit.id = resp[0].id;
        competencyUnit.charge = new SelectOption(resp[0].cargo.id, resp[0].cargo.label);
        competencyUnit.domainLevel = new SelectOption(resp[0].dominio.id, resp[0].dominio.label);
        competencyUnit.competency = new SelectOption(resp[0].competencia.id, resp[0].competencia.label);
        competencyUnit.priority = resp[0].prioridad;        
        competencyUnit.niveles = resp[0].niveles && resp[0].niveles.length > 0 ? resp[0].niveles.map((item:any)=> {
          return new SelectOption(item.id, item.label);
        }) : [];
        if(competencyUnit.niveles.length > 0){
          competencyUnit.nivel1 = new SelectOption(competencyUnit.niveles[0].value, competencyUnit.niveles[0].label);
        }
        return competencyUnit;
    }

    async deleteCompetencyUnit(id: number): Promise<void> {
        // Dummy implementation
        return;
    }

    async storeCompetencyUnit(competencyUnit: CompetencyUnit, estructuraNiveles: any) {

        let unidad = +competencyUnit.unit;
        if(estructuraNiveles && estructuraNiveles.length > 0){
          unidad = estructuraNiveles[estructuraNiveles.length - 1].idSeleccionado;
        }
        try {
          let body = {};
          if (competencyUnit.id) {
            const id = competencyUnit.id;
            let domain;
            let competency
            if (typeof competencyUnit.domainLevel === 'string' && !isNaN(competencyUnit.domainLevel)) {
                console.log('Es un número en forma de string');
                domain = +competencyUnit.domainLevel;
            } else {
                console.log('No es un número en forma de string');
                domain = +competencyUnit.domainLevel.value;
            }
            if (typeof competencyUnit.competency === 'number' && !isNaN(competencyUnit.competency)) {
                console.log('Es un número en forma de string');
                competency = +competencyUnit.competency;
            } else {
                console.log('No es un número en forma de string');
                competency = +competencyUnit.competency.value;
            }

            body = {
              "cargo": +competencyUnit.charge.value,
              "dominio": domain,
              "competencia": competency,
              "unidad": +unidad,
              "prioridad": +competencyUnit.priority

            }
            console.log('body >>>>>>', body);
            await firstValueFrom(this.put(environment.apiUrl, `/instrumento360/competencia/cargo/unidad/${id}`, body));
            this.toastrService.success('Competencia 360 actualizada con exito.');
          } else {
            
            body = {
              "competencia": +competencyUnit.competency,
              "unidad": +unidad,
              "cargosNivelDominioPrioridad": competencyUnit.chargesDomainLevelPriority && competencyUnit.chargesDomainLevelPriority.length > 0 ? competencyUnit.chargesDomainLevelPriority.map((item: any) => {
                return {
                  "cargoId": +item.charge.value,
                  "dominioId": +item.domainLevel,
                  "prioridad": +item.priority
                }
              }) : []
            }
            console.log('body', body);
            await firstValueFrom(this.post(environment.apiUrl, '/instrumento360/competencia/cargo/unidad', body));
            this.toastrService.success('Competencia 360  registrada con exito.');
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
     * Delete users from instrument
     * @param data 
     */
    async linkUserToInstrument(data:any): Promise<any> {
      try {
        const resp = await firstValueFrom(this.post(environment.apiUrl, '/instrumento360/asignar/usuarios', data));
        this.toastrService.success('El usuario ha sido vinculado con éxito.');
        console.log('resp', resp);
        return resp;
      } catch (error: any) {
        if (error.status != 500)
          this.toastrService.error('', 'Ha ocurrido un error. Intente más tarde.');
      }
    }


}
