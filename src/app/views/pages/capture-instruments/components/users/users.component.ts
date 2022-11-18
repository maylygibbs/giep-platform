import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from '../../../../../core/models/user';
import { environment } from '../../../../../../environments/environment';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { UserService } from '../../../../../core/services/user.service';
import { filter, Subscription } from 'rxjs';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { InstrumentsService } from '../../../../../core/services/instruments.service';
import * as moment from 'moment';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit {

  @ViewChild('inputFile')
  inputFile: ElementRef;

  defaultView: boolean = true
  step: number = 1;
  users: PaginationResponse;

  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: User;
  word: string;
  startDateFilter: any;
  endDateFilter: any;
  startDate: any;
  endDate: any;
  instrumentId: string;

  environment = environment;

  timeoutRef:any;

  data: any;

  private $eventNavigationEnd: Subscription;

  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private instrumentsService: InstrumentsService,
    private router: Router) {
    super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  async ngOnInit() {
    this.users = await this.instrumentsService.getUsersByInstrumentPaginated(
      {
        page: environment.paginator.default_page,
        rowByPage: environment.paginator.row_per_page,
        word: null,
        fechaDesde: null,
        fechaHasta: null,
        instrumento: null
      });
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });
  }


  /**
   * load page
   * @param pageInfo 
   */
  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.users = null;
    this.users = await this.instrumentsService.getUsersByInstrumentPaginated(
      {
        page: this.page,
        rowByPage: environment.paginator.row_per_page,
        word: this.word ? this.word : null,
        fechaDesde: this.startDateFilter ?? null,
        fechaHasta: this.endDateFilter ?? null,
        instrumento: parseInt(this.instrumentId) ?? null
      });
      console.log(this.users)
  }


  /**
   * Select item
   * @param id 
   */
  async select(id: number) {
    this.selectedItem = await this.userService.getUserById(id);
    this.next();
  }

  /**
   * Go to next page
   */
  next() {
    this.step++;
  }

  /**
   * Go to back page
   * @param item 
   */
  back(item: any) {
    this.selectedItem = item;
    this.step--;
    this.loadPage(this.page);
  }

  /**
   * Filter by word
   */
  search() {
    if (this.word && this.word.length > 0) {
      this.loadPage(environment.paginator.default_page);
    }
  }


  /**
 * Handle validation date range
 */
  changeDateFilter(start:any, end:any) {

    if(start.status == 'VALID' && end.status == 'VALID'){
      this.startDateFilter = this.startDate ? moment().year(this.startDate.year).month(this.startDate.month - 1).date(this.startDate.day).format('YYYY-MM-DD'):null;
      this.endDateFilter = this.endDate ? moment().year(this.endDate.year).month(this.endDate.month - 1).date(this.endDate.day).format('YYYY-MM-DD'):null;
      
      console.log(moment(this.startDateFilter).isValid())
      console.log(moment(this.endDateFilter).isValid())
      console.log(moment(this.startDateFilter).format('YYYY-MM-DD'))
      console.log(moment(this.endDateFilter).format('YYYY-MM-DD'))
  
      if (this.startDateFilter && this.endDateFilter) {
  
        if (moment(this.startDateFilter).isValid() && moment(this.endDateFilter).isValid()) {
          if (moment(this.startDateFilter).isSameOrBefore(this.endDateFilter)) {
            this.loadPage(1);
          } else {
            this.setInputError('Fecha inicio debe ser menor a la fecha fin');
          }
        } else {
          if (!moment(this.startDateFilter).isValid()) {
            this.setInputError('Fecha inicio es inválida');
          }
          if (!moment(this.endDateFilter).isValid()) {
            this.setInputError('Fecha fin es inválida');
          }
        }
  
      } else if (this.startDateFilter && !this.endDateFilter) {
        if (moment(this.startDate).isValid()) {
          this.loadPage(1);
        } else {
          this.setInputError('Fecha inicio es inválida');
        }
      } else if (!this.startDateFilter && this.endDateFilter) {
        if (moment(this.endDateFilter).isValid()) {
          this.setInputError('Indique fecha inicio');
        } else {
          this.setInputError('Fecha fin es inválida');
        }
      } else {
        this.loadPage(1);
      }
    }

  }


  /**
   * Handle event change input
   *  
   */
  changeSelectFilter(){
    console.log(this.instrumentId);
    if (this.timeoutRef) {
      clearTimeout(this.timeoutRef);
      this.timeoutRef = null;
    }

    this.timeoutRef = setTimeout(() => {
      this.loadPage(1);
    }, 300)
  }


  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }

}
