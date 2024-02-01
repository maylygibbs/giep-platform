import { User } from './../../../core/models/user';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';
import { EmailAccountService } from '../../../core/services/email-account.service';
import { PaginationResponse } from '../../../core/models/pagination-response';
import { environment } from '../../../../environments/environment';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  user:User;

  //Subcription
  user$: Subscription;

  mailboxes: PaginationResponse;

  environment = environment;

  notifications: PaginationResponse;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private authService:AuthService,
    private router: Router,
    public notificationService: NotificationService,
    private emailAccountService:EmailAccountService
  ) { }

  async ngOnInit() {
    this.user = this.authService.currentUser;
    console.log('company user', this.user)
    this.notificationSubcribe();
    this.notificationService.joinRoom(this.user.email);
    this.user$ = this.authService.currentUser$.subscribe((user:User)=>{
      this.user = user ? user : this.authService.currentUser;      
    });

    //this.mailboxes = await this.emailAccountService.getMailboxesPagined({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
  }


  notificationSubcribe(){
    this.notificationService.getNotificationsWithoutreading().subscribe((resp)=>{
      this.notifications = resp;
    })
  }
  

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    this.authService.logout();

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
    }
  }

  /**
   * load mailbox header by id
   * @param id 
   */
  loadMailboxHeaderById(id:number){

    this.router.navigate(['/apps/email/inbox'],{ queryParams: { mailboxId: id } })
   /* this.emailAccountService.getMailboxeHeaderByIdPagined({ 
      page: environment.paginator.default_page, 
      rowByPage: environment.paginator.row_per_page, 
      buzonId: id,
      sort: null })*/
  }

  /**
   * Go to page notifications.
   * @param email 
   * @param dropdown 
   */

  async goToNotificationPage(email:string,dropdown: NgbDropdown){
    dropdown.close();
    this.notificationService.sendChangeStatusNotification(email);
    await this.notificationService.getNotificationsWithoutreadingPaginated({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null, email:this.user.email});
    this.router.navigate(['/notifications'])
  }

  ngOnDestroy(){
    if(this.user$){
      this.user$.unsubscribe();
    }
  }

}
