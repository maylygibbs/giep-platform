import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent, Calendar } from '@fullcalendar/angular';
import { environment } from './../../../../../../environments/environment';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonsService } from './../../../../../core/services/commons.service';
import { UserService } from './../../../../../core/services/user.service';
import { User } from './../../../../../core/models/user';
import { ExpPersonalInformation } from './../../../../../core/models/exp-personal-information'
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-staexped',
  templateUrl: './staexped.component.html',
  styleUrls: ['./staexped.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StaexpedComponent extends BaseComponent implements OnInit {
  data: any;
  defaultView:boolean=true
  step:number = 1;
  users: PaginationResponse;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;
  selectedItem: User;
  word:string;
  environment = environment;

  private $eventNavigationEnd: Subscription;
  constructor(private userService: UserService,
    private router: Router) {
    super();
   }
  async ngOnInit() {
    this.users = await this.userService.getUsersPaginated({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });
  }
  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.users = null;
    this.users = await this.userService.getUsersPaginated({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null});
  }
  create(){
    this.selectedItem = new User();
    this.next();
  }
  async select(id: number) {
    this.selectedItem = await this.userService.getUserById(id);
    this.next();
  }
  async delete(id: number) {
    await this.userService.deleteUser(id);
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
      this.loadPage(environment.paginator.default_page);
    }
  }
  changeView(change:boolean){
    this.defaultView = change;
  }
  ngOnDestroy(){
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }
}
