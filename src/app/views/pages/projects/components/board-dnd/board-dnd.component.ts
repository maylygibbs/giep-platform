import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, Input,ViewChild, ElementRef, Inject, Renderer2 } from "@angular/core";
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { UserService } from './../../../../../core/services/user.service';
import { JLane, MOCK_LANES } from "../interface/lane";
import { DOCUMENT } from '@angular/common';
import { User } from './../../../../../core/models/user';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';


@Component({
  selector: "board-dnd",
  templateUrl: "./board-dnd.component.html",
  styleUrls: ["./board-dnd.component.scss"]
})
export class BoardDndComponent implements OnInit {
  users: PaginationResponse;
  lanes: JLane[];
  environment = environment;
  step:number = 1;
  page: number = 1;
  word:string;
  private $eventNavigationEnd: Subscription;

  constructor( @Inject(DOCUMENT) private document: Document,private userService: UserService,private router: Router) {}

  async ngOnInit() {
    this.lanes = MOCK_LANES;

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
}
