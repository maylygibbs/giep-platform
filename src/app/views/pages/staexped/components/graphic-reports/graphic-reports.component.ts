import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { environment } from '../../../../../../environments/environment';
import { StaexpedGraphicReportService } from '../../../../../core/services/staexped-graphic-reports.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-graphic-reports',
  templateUrl: './graphic-reports.component.html',
  styleUrls: ['./graphic-reports.component.scss']
})
export class GraphicReportsComponent implements OnInit {
  results: PaginationResponse;
  data: any;
  selectedReport: string = '1';
  selectedGraphic: string = '1';
  selectedDepartment:string;
  submited:boolean= false;

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

    if (this.selectedReport && this.selectedDepartment &&  this.selectedGraphic) {
      this.page = pageInfo;
      this.results = null;
      this.submited = true;

      const body = {
        page: this.page,
        rowByPage: environment.paginator.row_per_page,
        department: this.selectedDepartment ? parseInt(this.selectedDepartment) : null
      }

      this.results = await this.staexpedGraphicReportService.getGraphicReportsPagined(
        body,
        this.selectedGraphic,

      );
      this.submited = false;
      console.log('results', this.results)
    } else {
      this.submited = false
      if (!this.selectedReport) {
        this.results = null;
        this.toastrService.warning('Indique el tipo de reporte para visualizar los resultados respectivos.');
      }
      if (!this.selectedDepartment) {
        this.results = null;
        this.toastrService.warning('Indique el departamento para visualizar los resultados.');
      }
      if (!this.selectedGraphic) {
        this.results = null;
        this.toastrService.warning('Indique el tipo de gráfico para visualizar los resultados.');
      }

    }

  }


  clearFilters(){

    this.selectedReport = '1';
    this.selectedGraphic = '1';
    this.selectedDepartment = null;

   // this.loadPage(environment.paginator.default_page);
  }

    /**
 * Handle event change input
 *  
 */
    changeSelectFilter() {
      this.loadPage(environment.paginator.default_page);
    }

}
