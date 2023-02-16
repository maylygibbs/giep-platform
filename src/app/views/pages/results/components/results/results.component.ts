import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { SelectOption } from '../../../../../core/models/select-option';
import { CommonsService } from '../../../../../core/services/commons.service';
import { InstrumentsService } from '../../../../../core/services/instruments.service';
import { environment } from '../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { filter, Subscription } from 'rxjs';
import { throws } from 'assert';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent extends BaseComponent implements OnInit {

  submited:boolean= false;
  results: PaginationResponse;

  states: Array<SelectOption>;
  cities: Array<SelectOption>;

  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  startDate: any;
  endDate: any;
  selectedCountry: SelectOption;
  selectedState: SelectOption;
  selectedCity: SelectOption;
  selectedSex: SelectOption;
  selectedResult: string = '1';
  selectedGraphic: string = '1';
  word: string;

  data: any;
  instrumentId: number;

  startDateFilter: any;
  endDateFilter: any;

  environment = environment;

  resultsRequest: NodeJS.Timeout;

  private $eventNavigationEnd: Subscription;

  constructor(private route: ActivatedRoute,
    private commonsService: CommonsService,
    private instrumentsService: InstrumentsService,
    private router: Router,
    private toastrService: ToastrService,) {
    super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
    this.route.queryParams.subscribe(params => {
      this.instrumentId = params['id'] ? parseInt(params['id']) : null;

    });
  }

  async ngOnInit() {
    await this.loadPage(environment.paginator.default_page);
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      console.log('Ruta resultados',this.router.getCurrentNavigation())
      this.loadPage(environment.paginator.default_page);
    });
  }



  async loadPage(pageInfo: any) {

    if (this.instrumentId && this.selectedResult && this.selectedGraphic) {
      this.page = pageInfo;
      this.results = null;
      this.submited = true;
      this.results = await this.instrumentsService.getInstrumentResultsPagined(
        {
          page: this.page,
          rowByPage: environment.paginator.row_per_page,
          word: this.word ?? null,
          byuser: this.selectedResult ? parseInt(this.selectedResult) : 1,
          desde: this.startDateFilter ? this.startDateFilter : null,
          hasta: this.endDateFilter ? this.endDateFilter : null,
          sexo: this.selectedSex ? this.selectedSex : null,
          pais: this.selectedCountry?.value ? parseInt(this.selectedCountry?.value) : null,
          estado: this.selectedState?.value ? parseInt(this.selectedState?.value) : null,
          ciudad: this.selectedCity?.value ? parseInt(this.selectedCity?.value) : null
        },
        this.instrumentId,
        this.selectedGraphic
      );
      this.submited = false;
      console.log('results', this.results)
    } else {
      this.submited = false
      if (!this.instrumentId) {
        this.results = null;
        this.toastrService.warning('Indique el instrumento de captura para visualizar los resultados respectivos.');
      }
      if (!this.selectedResult) {
        this.results = null;
        this.toastrService.warning('Indique el tipo de resultado para visualizar los resultados.');
      }
      if (!this.selectedGraphic) {
        this.results = null;
        this.toastrService.warning('Indique el tipo de gráfico para visualizar los resultados.');
      }

    }

  }



  /**
 * Handle validation date range
 */
  changeDateFilter(start: any, end: any) {
    if (start.status == 'VALID' && end.status == 'VALID') {
      this.startDateFilter = this.startDate ? moment().year(this.startDate.year).month(this.startDate.month - 1).date(this.startDate.day).format('YYYY-MM-DD') : null;
      this.endDateFilter = this.endDate ? moment().year(this.endDate.year).month(this.endDate.month - 1).date(this.endDate.day).format('YYYY-MM-DD') : null;

      console.log(moment(this.startDateFilter).isValid())
      console.log(moment(this.endDateFilter).isValid())
      console.log(moment(this.startDateFilter).format('YYYY-MM-DD'))
      console.log(moment(this.endDateFilter).format('YYYY-MM-DD'))

      if (this.startDateFilter && this.endDateFilter) {

        if (moment(this.startDateFilter).isValid() && moment(this.endDateFilter).isValid()) {
          if (moment(this.startDateFilter).isSameOrBefore(this.endDateFilter)) {
            this.loadPage(environment.paginator.default_page);
          } else {
            this.setInputError('Fecha inicio debe ser menor a la fecha fin');
          }
        } else {
          if (!moment(this.startDateFilter).isValid()) {
            this.setInputError('Fecha inicio es inválida');
          }
          if (!moment(this.endDateFilter).isValid()) {
            this.setInputError('Fecha fin es inválida');
          }
        }

      } else if (this.startDateFilter && !this.endDateFilter) {
        if (moment(this.startDate).isValid()) {
          this.loadPage(environment.paginator.default_page);
        } else {
          this.setInputError('Fecha inicio es inválida');
        }
      } else if (!this.startDateFilter && this.endDateFilter) {
        if (moment(this.endDateFilter).isValid()) {
          this.setInputError('Indique fecha inicio');
        } else {
          this.setInputError('Fecha fin es inválida');
        }
      } else {
        this.loadPage(environment.paginator.default_page);
      }
    }
  }


  /**
 * Handle event change input
 *  
 */
  changeSelectFilter() {
    this.loadPage(environment.paginator.default_page);
  }


  async onChangeCountry(event: any) {
    this.states = undefined;
    this.cities = undefined;
    this.selectedState = undefined;
    this.selectedCity = undefined;
    if (this.selectedCountry) {
      this.states = await this.commonsService.getAllStates(this.selectedCountry.id);
    }
    this.loadPage(environment.paginator.default_page);

  }

  async onChangeStates(event: any) {

    this.cities = undefined;
    this.selectedCity = undefined;
    if (this.selectedState) {
      this.cities = await this.commonsService.getAllCities(this.selectedState.id);
    }
    this.loadPage(environment.paginator.default_page);

  }

  /**
 * search by word
 */
  search() {
    if (this.resultsRequest) {
      clearTimeout(this.resultsRequest);
      this.resultsRequest = null;
     
    }
    this.resultsRequest = setTimeout(() => {
       this.loadPage(environment.paginator.default_page);
    }, 300);

  }

  /**
   * Clear all filters
   */
  clearFilters(){
    this.startDate = null; 
    this.endDate = null;
    this.selectedCountry = null;
    this.selectedState = null;
    this.selectedCity = null;
    this.selectedSex = null;
    this.selectedResult = '1';
    this.selectedGraphic = '1';
    this.startDateFilter = null;
    this.endDateFilter = null;
    this.loadPage(environment.paginator.default_page);
  }


  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }


}
