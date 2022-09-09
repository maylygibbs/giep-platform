import { InputType } from './../../../../../core/models/input-type';
import { SelectOption } from './../../../../../core/models/select-option';
import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { Instrument } from './../../../../../core/models/instrument';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent extends BaseComponent  implements OnInit {

  step:number = 1;
  inputs: PaginationResponse;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  

  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;

  
  selectedItem: InputType;
  word:string;

  private $eventNavigationEnd: Subscription;

  constructor(private instrumentsService: InstrumentsService,
    private router: Router) { 
    super()
  }

  async ngOnInit() {
    this.inputs = await this.instrumentsService.getInputTypesPagined({ page: 1, rowByPage: 3, word: null });
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(1);
    });
  }


  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.inputs = null;
    this.inputs = await this.instrumentsService.getInputTypesPagined({ page: this.page, rowByPage: 3, word: this.word ? this.word : null});
  }

  create(){
    this.selectedItem = new InputType();
    this.next();
  }

  async select(id: number) {
    this.selectedItem = await this.instrumentsService.getInputTypeById(id);
    this.next();
  }

  async delete(id: number) {
    //await this.userService.deleteUser(id);
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

  ngOnDestroy(){
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }


}
