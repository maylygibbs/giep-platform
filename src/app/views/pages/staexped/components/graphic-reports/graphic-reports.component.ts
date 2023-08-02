import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { environment } from '../../../../../../environments/environment';
import { StaexpedGraphicReportService } from '../../../../../core/services/staexped-graphic-reports.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, filter } from 'rxjs';
import * as moment from 'moment';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-graphic-reports',
  templateUrl: './graphic-reports.component.html',
  styleUrls: ['./graphic-reports.component.scss']
})
export class GraphicReportsComponent extends BaseComponent implements OnInit {
  results: PaginationResponse;
  data: any;
  selectedReport: string = '1';
  selectedGraphic: string = '1';
  selectedDepartment: string;
  submited: boolean = false;
  startDate: any;
  endDate: any;
  startDateFilter: any;
  endDateFilter: any;


  /** Pagination attr */
  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;

  environment = environment;

  private $eventNavigationEnd: Subscription;

  constructor(private route: ActivatedRoute,
    private staexpedGraphicReportService: StaexpedGraphicReportService,
    private router: Router,
    private toastrService: ToastrService) {
      super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  async ngOnInit() {
    await this.loadPage(environment.paginator.default_page);
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadPage(environment.paginator.default_page);
    });
  }

  async loadPage(pageInfo: any) {

    if (this.selectedGraphic) {
      this.page = pageInfo;
      this.results = null;
      this.submited = true;

      const body = {
        page: this.page,
        rowByPage: environment.paginator.row_per_page,
        department: this.selectedDepartment ? parseInt(this.selectedDepartment) : null,
        startDate: this.startDateFilter ?? null,
        endDate: this.endDateFilter ?? null
      }

      this.results = await this.staexpedGraphicReportService.getGraphicReportsPagined(
        body,
        this.selectedGraphic,

      );
      this.submited = false;
      console.log('results', this.results)
    } else {
      this.submited = false
      if (!this.selectedGraphic) {
        this.results = null;
        this.toastrService.warning('Indique el tipo de gráfico para visualizar los resultados.');
      }

    }

  }


  clearFilters() {
    this.startDate = null;
    this.endDate = null;
    this.startDateFilter = null;
    this.endDateFilter = null;
    this.selectedReport = '1';
    this.selectedGraphic = '1';
    this.selectedDepartment = null;
  }

  /**
* Handle event change input
*  
*/
  changeSelectFilter() {
    this.loadPage(environment.paginator.default_page);
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

}
