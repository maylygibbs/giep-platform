import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { SelectOption } from './../../../../../core/models/select-option';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { ColumnMode } from '@swimlane/ngx-datatable';

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

  constructor(private instrumentsService: InstrumentsService) {
    super();
   }

  async ngOnInit() {
    this.categories = await this.instrumentsService.getCategoriesPagined({ page: this.page, rowByPage: 3, word: null});
  }

  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.categories = null;
    this.categories = await this.instrumentsService.getCategoriesPagined({ page: this.page, rowByPage: 3, word: this.word ? this.word : null});
  }

  create(){
    this.selectedItem = new SelectOption();
    this.next();
  }

  async select(id: number) {
    this.selectedItem = await this.instrumentsService.getCategoryById(id);
    this.next();
  }

  async delete(id: number) {
    //await this.instrumentsService.deleteCategory(id);
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
    if (this.word && this.word.length > 0) {
      this.loadPage(1);
    }
  }

}