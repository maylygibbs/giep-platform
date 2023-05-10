import { Component, OnInit } from '@angular/core';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { environment } from '../../../../../../environments/environment';
import { Subscription, filter } from 'rxjs';
import { NotificationModel } from '../../../../../core/models/notification';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { NotificationService } from '../../../../../core/services/notification.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends BaseComponent implements OnInit {

  step: number = 1;
  notifications: PaginationResponse;


  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: NotificationModel;
  word: string;

  environment = environment;
  email:string;

  private $eventNavigationEnd: Subscription;

  notificationsRequest: NodeJS.Timeout;

  timeAgo;

  dtOptions: DataTables.Settings = {
    info: false,
    paging: false,
    searching: false,
    ordering: false,
    autoWidth: true,
    responsive: true,
    language: {
      emptyTable: "No hay datos disponibles"
    }
  };

  constructor(private notificationService: NotificationService,
    private authService:AuthService,
    private router: Router) {
    super();
   }

 async ngOnInit() {
  this.email = this.authService.currentUser.email;
    this.notifications = await this.notificationService.getNotificationsPaginated({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null, email:this.email});
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      console.log('NavigationEnd Users')
      this.loadPage(environment.paginator.default_page);
    });
  }

  /**
   * search by word
   */
  search() {
    if(this.notificationsRequest){
      clearTimeout(this.notificationsRequest);
      this.notificationsRequest = null;
    }
    this.notificationsRequest = setTimeout(() => {
      this.loadPage(environment.paginator.default_page);
    }, 300);
     

  }

  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.notifications = null;
    this.notifications = await this.notificationService.getNotificationsPaginated({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null, email:this.email});
  }


  async delete(id:number){
   await this.notificationService.deleteNotificationById(id);
    this.loadPage(this.page);

  }

}
