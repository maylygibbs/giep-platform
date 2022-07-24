import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { User } from './../../../../../core/models/user';
import { UserService } from './../../../../../core/services/user.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  public dtOptions: DataTables.Settings = {
    info: false,
    paging: false,
    searching: false,
    ordering: true,
    autoWidth: true,
    responsive: true
  };
  
  dtTrigger: Subject<any> = new Subject<any>();
  
  users: PaginationResponse;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  page: number = 1;

  selectedItem: User;



  constructor(private userService: UserService) { }

  async ngOnInit() {

    this.users = await this.userService.getUsersPaginated({ page: 1, rowByPage: 3, word: null });
    this.dtTrigger.next(this.users);
  }

  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo.offset + 1;
    this.users = await this.userService.getUsersPaginated({ page: this.page, rowByPage: 3, word: null });
  }

  async select(id: number) {
    this.selectedItem = await this.userService.getUserById(id);
  }

  async delete(id: number) {
    await this.userService.deleteUser(id);
    this.loadPage({offset:this.page-1})
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
