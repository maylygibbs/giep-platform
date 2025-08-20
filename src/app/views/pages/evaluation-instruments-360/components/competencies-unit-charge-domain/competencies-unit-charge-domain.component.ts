import { environment } from '../../../../../../environments/environment';
import { Evaluation360InstrumentsService } from '../../../../../core/services/evaluation360-instruments.service';
import { CompetencyUnit } from '../../../../../core/models/competency-unit';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-competencies-unit-charge-domain',
  templateUrl: './competencies-unit-charge-domain.component.html',
  styleUrls: ['./competencies-unit-charge-domain.component.scss']
})
export class CompetenciesUnitChargeDomainComponent extends BaseComponent implements OnInit {

  step:number = 1;
  competencyUnits: PaginationResponse;

  loadingIndicator = true;
  reorderable = true;

  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;

  selectedItem: CompetencyUnit;
  word:string;

  environment = environment;

  competencyUnitsRequest: NodeJS.Timeout;
  
  private $eventNavigationEnd: Subscription;

  data: any;

  constructor(private evaluationService: Evaluation360InstrumentsService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
   }

  async ngOnInit() {
    this.competencyUnits = await this.evaluationService.getCompetencyUnitsPagined({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null});
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });
  }

  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.competencyUnits = null;
    this.competencyUnits = await this.evaluationService.getCompetencyUnitsPagined({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null});
  }

  create(){
    this.selectedItem = new CompetencyUnit();
    this.next();
  }

  async select(id: number) {
    this.selectedItem = await this.evaluationService.getCompetencyUnitById(id);
    this.next();
  }

  async delete(id: number) {
    await this.evaluationService.deleteCompetencyUnit(id);
    this.loadPage(this.page);
  }

  next(){
    this.step++;
  }

  back(item:any){
    this.selectedItem = item;
    this.step--;
    this.loadPage(this.page);
  }

  search(){
    if (this.competencyUnitsRequest) {
      clearTimeout(this.competencyUnitsRequest);
      this.competencyUnitsRequest = null;
    }
    this.competencyUnitsRequest = setTimeout(() => {
      this.loadPage(environment.paginator.default_page);
    }, 300);   
  }

  ngOnDestroy(){
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }
} 