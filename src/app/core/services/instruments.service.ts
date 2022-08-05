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

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService extends HttpService{

    // colors and font variables for apex chart 
    obj = {
      primary        : "#6571ff",
      secondary      : "#7987a1",
      success        : "#05a34a",
      info           : "#66d1d1",
      warning        : "#fbbc06",
      danger         : "#ff3366",
      light          : "#e9ecef",
      dark           : "#060c17",
      muted          : "#7987a1",
      gridBorder     : "rgba(77, 138, 240, .15)",
      bodyColor      : "#000",
      cardBg         : "#fff",
      fontFamily     : "'Roboto', Helvetica, sans-serif"
    }
  

  constructor(protected http: HttpClient,
    private toastrService: ToastrService,
    private userService: UserService) { 
    super(http);
  }

/**
 * get pending instruments to answer
 * @param id 
 * @returns 
 */
  async getInstrumentsById(id:number):Promise<any>{
    const resp = await firstValueFrom(this.get(environment.apiUrl,`/encuesta/instrumentocaptura/${id}`));
    const instrument = new Instrument();
    instrument.id = resp.data[0].id;
    instrument.name = resp.data[0].nombre;
    instrument.description = resp.data[0].descripcion;
    instrument.questions = resp.data[0].pregunta.map((item:any)=>{
        const question = new Question();
        question.id = item.id;
        question.label = item.pregunta;
        question.nameImput = 'question-'+item.idInput.Descripcion+'-'+item.id;
        question.order = item.orden;
        question.inputType = new SelectOption(item.idInput.id, item.idInput.Descripcion);
        question.className = item.class;
        question.required = item.obligatorio == 1 ? true : false;
        question.score = item.puntos;
        question.options = item.opciones.map((itemOption:any)=>{
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
  async storeInstrumetsResponse(data:any){    
    try {
      const resp = await firstValueFrom(this.post(environment.apiUrl,'/encuesta/respuesta',data));
      await this.userService.getInfoUser();
      this.toastrService.success('Sus respuestas se han registrado con exito.');
    } catch (error) {
      this.toastrService.error('','Ha ocurrido un error. Intente más tarde.');
    }
  }

  /**
   * 
   * @param id 
   */
  async getInstrumentResultByCategory(id:number):Promise<any>{
    
    const resp = await firstValueFrom(this.get(environment.apiUrl,`/encuesta/resultados/${id}`));
    
    let results:any[] = [];
    if(resp && resp.usuarios.length > 0){

      results = resp.usuarios.map((item:any)=>{
        const result:any = {};
        result.name = item.nombre;
        const data1 = item.resultado.map((itemData:any)=>{
          return {
            x: itemData.categoria,
            y: itemData.puntos
          }
        });
        const data2 = item.resultado.map((itemData:any)=>{
          return itemData.puntos;
        });
        const categories = item.resultado.map((itemData:any)=>{
          return itemData.categoria;
        });
        result.optionsChart = this.getOptionsChartBarByCategory(this.obj,data2, categories);
        return result;
      })

    }
    
    return results;
  }


  getOptionsChartBarByCategory(obj: any, data:any, categories:any){
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
      '#f48024', '#69d2e7','#33b230', '#546E5E'
      ],
      fill: {
        opacity: .9
      } , 
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
          style:{
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
          horizontal: true,
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


}
