import { Component, OnInit } from '@angular/core';
import { PaginationResponse } from '../../../../core/models/pagination-response';
import { AccreditationType } from '../../../../core/models/accreditation-type';
import { environment } from '../../../../../environments/environment';
import { Subscription, filter } from 'rxjs';
import { CalendarService } from '../../../../core/services/calendar.service';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-accreditationstypes',
  templateUrl: './accreditationstypes.component.html',
  styleUrls: ['./accreditationstypes.component.scss']
})
export class AccreditationstypesComponent extends BaseComponent implements OnInit {


  step: number = 1;
  accreditationsTypes: PaginationResponse;
  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: AccreditationType;
  word: string;

  environment = environment;

  accreditationsTypeRequest: NodeJS.Timeout;

  private $eventNavigationEnd: Subscription;

  constructor(private calendarService: CalendarService,
    private router: Router) {
    super();
  }

  async ngOnInit() {
    this.accreditationsTypes = await this.calendarService.getAccreditationsTypesPagined({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
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
    this.accreditationsTypes = null;
    this.accreditationsTypes = await this.calendarService.getAccreditationsTypesPagined({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
  }

  /**
   * Create item
   */
  create() {
    this.selectedItem = new AccreditationType();
    this.next();
  }

  /**
 * Select item
 * @param id 
 */
  async select(accreditationType: AccreditationType) {
    this.selectedItem = accreditationType;
    this.next();
  }

  /**
   * Delete item
   * @param id 
   */
  async delete(id: number) {
    //await this.instrumentsService.deleteInputType(id);
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
    if (this.accreditationsTypeRequest) {
      clearTimeout(this.accreditationsTypeRequest);
      this.accreditationsTypeRequest = null;
    }
    this.accreditationsTypeRequest = setTimeout(() => {
      this.loadPage(environment.paginator.default_page);
    }, 300);

  }

  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }



}
