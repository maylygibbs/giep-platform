import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent, Calendar } from '@fullcalendar/angular';
import { environment } from './../../../../../../environments/environment';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonsService } from './../../../../../core/services/commons.service';
import { UserService } from './../../../../../core/services/user.service';
import { User } from './../../../../../core/models/user';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { filter, Subscription } from 'rxjs';
import { ExppersonalinformationService } from '../../../../../core/services/exppersonalinformation';
import { ExpPersonalInformation } from './../../../../../core/models/exp-personal-information'
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-staexped',
  templateUrl: './staexped.component.html',
  styleUrls: ['./staexped.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StaexpedComponent extends BaseComponent implements OnInit {
  exppersonalinformation:ExpPersonalInformation=new ExpPersonalInformation();
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
  tiprepots: number =1;
  lock: boolean = false;

  reports: any[] = [
    { id: 1, value: 'Expedientes-Detalles-Lineal', label: 'Expedientes-Detalles-Lineal' },
    { id: 2, value: 'Expedientes-Estudios-Academicos', label: 'Expedientes-Estudios-Academicos' },
    { id: 3, value: 'Expedientes-Especialidades-Area', label: 'Expedientes-Especialidades-Area'},
    { id: 4, value: 'Expedientes-Transferencias', label: 'Expedientes-Transferencias' },
    { id: 5, value: 'Expedientes-Promocion', label: 'Expedientes-Promocion' },
    { id: 6, value: 'Expedientes-Vacaciones', label: 'Expedientes-Vacaciones' },
    { id: 7, value: 'Expedientes-Permisos', label: 'Expedientes-Permisos' },
    { id: 8, value: 'Expedientes-Reposos', label: 'Expedientes-Reposos' },
];

  private $eventNavigationEnd: Subscription;
  constructor(private userService: UserService,
    private exppersonalinformationService: ExppersonalinformationService,
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

  async validReports(event: number) {
    this.tiprepots = event;
  }
async repotsImp() {
if (this.tiprepots==1){
  this.lock = true;
  const resp = await this.exppersonalinformationService.reports(this.tiprepots);
  if (resp) {
      let file = this.convertBase64ToFile(resp.file, resp.title);
      saveAs(file, resp.title + '.' + resp.extension);
  }
    this.lock = false;
}else{
 //customizado
      this.lock = true;
      this.exppersonalinformation.reporttype=this.tiprepots;
      const resp = await this.exppersonalinformationService.reportsExcel(this.exppersonalinformation.reportsSelectEcel.value);
      //const resp = await this.exppersonalinformationService.reportsExcel(ExpPersonalInformation.mapForPostRepotsExcel(this.exppersonalinformation));
      if (resp) {
          let file = this.convertBase64ToFile(resp.file, resp.title);
          saveAs(file, resp.title + '.' + resp.extension);
      }
      this.lock = false;
  }
  
}

}