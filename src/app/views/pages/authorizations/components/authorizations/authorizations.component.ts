import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Authorization } from '../../../../../core/models/authorization';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { environment } from '../../../../../../environments/environment';
import { AuthorizationService } from '../../../../../core/services/authorization.service';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';

@Component({
  selector: 'app-authorizations',
  templateUrl: './authorizations.component.html',
  styleUrls: ['./authorizations.component.scss']
})
export class AuthorizationsComponent extends BaseComponent implements OnInit {

  step: number = 1;
  authorizations: PaginationResponse;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;


  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: Authorization;
  word: string;

  environment = environment;

  authorizationsRequest: NodeJS.Timeout;

  private $eventNavigationEnd: Subscription;

  constructor(private authorizationService: AuthorizationService,
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
      this.authorizations = null;
      this.authorizations = await this.authorizationService.getAuthorizationsPagined({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
    }
  
    /**
   * Create item
   */
    create() {
      this.selectedItem = new Authorization();
      this.next();
    }
  
    /**
     * Select item
     * @param id 
     */
    async select(id: number) {
      this.selectedItem = await this.authorizationService.getAppById(id);
      this.next();
    }
  
    /**
     * Delete item
     * @param id 
     */
    async delete(id: number) {
      //await this.authorizationService.deleteAuthorization(id);
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
      if(this.authorizationsRequest){
        clearTimeout(this.authorizationsRequest);
        this.authorizationsRequest = null;
      }
      this.authorizationsRequest = setTimeout(() => {
        this.loadPage(environment.paginator.default_page);
      }, 300);

    }
  
  
    ngOnDestroy() {
      if (this.$eventNavigationEnd) {
        this.$eventNavigationEnd.unsubscribe()
      }
    }  

}
