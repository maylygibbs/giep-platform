import { environment } from './../../../../../../environments/environment';
import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { SelectOption } from './../../../../../core/models/select-option';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseComponent implements OnInit {


  step:number = 1;
  categories: PaginationResponse;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;

  
  selectedItem: SelectOption;
  word:string;

  environment = environment;

  categoriesRequest: NodeJS.Timeout;
  
  private $eventNavigationEnd: Subscription;

  data: any;

  constructor(private instrumentsService: InstrumentsService,
    private router: Router,
    private route: ActivatedRoute) {
    super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
   }

  async ngOnInit() {
    this.categories = await this.instrumentsService.getCategoriesPagined({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null});
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });
  }

  /**
   * Load page by page
   * @param pageInfo 
   */
  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.categories = null;
    this.categories = await this.instrumentsService.getCategoriesPagined({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null});
  }

  /**
   * Create an Category
   */
  create(){
    this.selectedItem = new SelectOption();
    this.next();
  }

  /**
   * Select item
   * @param id 
   */
  async select(id: number) {
    this.selectedItem = await this.instrumentsService.getCategoryById(id, this.data.charges, this.data.levels);
    this.next();
  }

  /**
   * Delete item by id
   * @param id 
   */
  async delete(id: number) {
    await this.instrumentsService.deleteCategory(id);
    this.loadPage(this.page);
  }

  /** Go to next page */
  next(){
    this.step++;
  }

  /**
   * Go to back page
   * @param item 
   */
  back(item:any){
    this.selectedItem = item;
    this.step--;
    this.loadPage(this.page);
  }

  /**
   * Search by word
   */
  search(){

    if (this.categoriesRequest) {
      clearTimeout(this.categoriesRequest);
      this.categoriesRequest = null;
    }
    this.categoriesRequest = setTimeout(() => {
      this.loadPage(environment.paginator.default_page);
    }, 300);   

  }

  ngOnDestroy(){
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }

}
