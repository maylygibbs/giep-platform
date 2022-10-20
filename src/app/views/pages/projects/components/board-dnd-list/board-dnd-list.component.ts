import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, Input,ViewChild, ElementRef, Inject, Renderer2, ViewEncapsulation } from "@angular/core";
import { JLane, JIssue } from '../interface/lane';

import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { UserService } from './../../../../../core/services/user.service';
import { DOCUMENT } from '@angular/common';
import { User } from './../../../../../core/models/user';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: '[board-dnd-list]',
  templateUrl: './board-dnd-list.component.html',
  styleUrls: ['./board-dnd-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardDndListComponent implements OnInit {
  @Input() lane: JLane;
  users: PaginationResponse;

  environment = environment;
  step:number = 1;
  page: number = 1;
  word:string;
  private $eventNavigationEnd: Subscription;
  
  constructor(@Inject(DOCUMENT) private document: Document,private userService: UserService,private router: Router) {}

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

  drop(event: CdkDragDrop<JIssue[]>) {
    let isMovingInsideTheSameList = event.previousContainer === event.container;
    if (isMovingInsideTheSameList) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
