import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { filter, Subscription } from 'rxjs';
import { Apps } from 'src/app/core/models/apps';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { environment } from '../../../../../../environments/environment';
import { AppsService } from '../../../../../core/services/apps.service';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent extends BaseComponent implements OnInit {

  step: number = 1;
  apps: PaginationResponse;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;


  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: Apps;
  word: string;

  environment = environment;

  private $eventNavigationEnd: Subscription;
  constructor(private appsService: AppsService,
    private router: Router) {
      super();
     }

  ngOnInit(): void {
    this.loadPage(environment.paginator.default_page);
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
    this.apps = null;
    this.apps = await this.appsService.getAppsPagined({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
  }

  /**
 * Create item
 */
  create() {
    this.selectedItem = new Apps();
    this.next();
  }

  /**
   * Select item
   * @param id 
   */
  async select(id: number) {
    this.selectedItem = await this.appsService.getAppById(id);
    this.next();
  }

  /**
   * Delete item
   * @param id 
   */
  async delete(id: number) {
    //await this.appsService.deleteRole(id);
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
