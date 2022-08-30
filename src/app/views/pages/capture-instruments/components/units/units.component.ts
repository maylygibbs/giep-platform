import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { UnitType } from './../../../../../core/models/unit-type';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent extends BaseComponent implements OnInit {

  step:number = 1;
  units: PaginationResponse;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  

  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;

  
  selectedItem: UnitType;
  word:string;

  constructor(private instrumentsService: InstrumentsService) { 
    super()
  }

  async ngOnInit() {
    this.units = await this.instrumentsService.getUnitTypesPagined({ page: 1, rowByPage: 3, word: null });
  }

  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.units = null;
    this.units = await this.instrumentsService.getUnitTypesPagined({ page: this.page, rowByPage: 3, word: this.word ? this.word : null});
  }

  create(){
    this.selectedItem = new UnitType();
    this.next();
  }

  async select(id: number) {
    this.selectedItem = await this.instrumentsService.getUnitTypeById(id);
    this.next();
  }

  async delete(id: number) {
    //await this.userService.deleteUnitType(id);
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
