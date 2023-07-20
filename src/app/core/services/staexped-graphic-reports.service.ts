import { PaginationResponse } from '../models/pagination-response';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Vacation } from '../models/vacation';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class StaexpedGraphicReportService extends HttpService {

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
    private toastrService: ToastrService) {
    super(http);
  }

  /**
 * Check all instruments, supports pagination and filter
 * @param filter 
 * @returns 
 */
  async getGraphicReportsPagined(filter: any, selectedGraphic: string): Promise<PaginationResponse> {
    const resp = await firstValueFrom(this.post(environment.apiUrl, `/staexped/reportes`,filter));
    const paginator = new PaginationResponse(filter.page, filter.rowByPage);
    paginator.count = resp.count;
    paginator.sample = resp.muestra;
    if (resp && resp.entidades?.length > 0) {

      paginator.data = resp.entidades.map((item: any) => {
        const result: any = {};
        result.name = item.entidad;

        result.dependence = item.departamento;

        const source = [];
        let data = item.resultado?.map((itemData: any) => {
          return itemData.value;
        });
        source.push({data: data});

        
        let data2 = item.resultado?.map((itemData: any) => {
          return parseInt(itemData.value);
        });
        let categories = item.resultado.map((itemData: any) => {
          return itemData.label;
        });


        switch (selectedGraphic) {

          case '1':
            result.optionsChart = this.getOptionsChartBar(this.obj, source, categories, true);

            break;
          case '2':
            result.optionsChart = this.getOptionsChartBar(this.obj, source, categories, false);
            break;
          case '3':
            result.optionsChart = this.getOptionsChartPie(this.obj, data2, categories);
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
      console.log(source)
      console.log(categories)
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


}


