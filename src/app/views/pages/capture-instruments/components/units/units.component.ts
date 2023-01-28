import { environment } from './../../../../../../environments/environment';
import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { UnitType } from './../../../../../core/models/unit-type';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent extends BaseComponent implements OnInit {

  step: number = 1;
  units: PaginationResponse;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;


  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: UnitType;
  word: string;

  environment = environment;

  private $eventNavigationEnd: Subscription;

  constructor(private instrumentsService: InstrumentsService,
    private router: Router) {
    super()
  }

  async ngOnInit() {
    this.units = await this.instrumentsService.getUnitTypesPagined({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });
  }

  /**
   * Load items page by page
   * @param pageInfo 
   */
  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.units = null;
    this.units = await this.instrumentsService.getUnitTypesPagined({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
  }

  /**
   * Create item
   */
  create() {
    this.selectedItem = new UnitType();
    this.next();
  }

  /**
 * Select item
 * @param id 
 */
  async select(id: number) {
    this.selectedItem = await this.instrumentsService.getUnitTypeById(id);
    this.next();
  }


  /**
   * Delete item
   * @param id 
   */
  async delete(id: number) {
    await this.instrumentsService.deleteUnitType(id);
    this.loadPage(this.page);
  }

  /**
 * Next step
 */
  next() {
    this.step++;
  }

  /**
 * Back step
 * @param item 
 */
  back(item: any) {
    this.selectedItem = item;
    this.step--;
    this.loadPage(this.page);
  }


  /**
 * Search item
 */
  search() {
    if (this.word && this.word.length > 0) {
      this.loadPage(environment.paginator.default_page);
    }
  }

  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }


}
