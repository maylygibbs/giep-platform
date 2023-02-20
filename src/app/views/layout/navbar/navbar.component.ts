import { User } from './../../../core/models/user';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user:User;

  //Subcription
  user$: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private authService:AuthService,
    private router: Router,
    public notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.currentUser$.subscribe((user:User)=>{
      this.user = user ? user : this.authService.currentUser;
    });
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

  ngOnDestroy(){
    if(this.user$){
      this.user$.unsubscribe();
    }
  }

}
