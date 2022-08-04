import { environment } from './../../../../../../environments/environment';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { User } from './../../../../../core/models/user';
import { UserService } from './../../../../../core/services/user.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent extends BaseComponent implements  OnInit {

  step:number = 1;
  users: PaginationResponse;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  page: number = 1;

  selectedItem: User;

  word:string;



  constructor(private userService: UserService) {
    super();
   }

  async ngOnInit() {

    this.users = await this.userService.getUsersPaginated({ page: 1, rowByPage: 3, word: null });

  }

  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.users = await this.userService.getUsersPaginated({ page: this.page, rowByPage: 3, word: this.word ? this.word : null});
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
      this.loadPage(1);
    }
  }

  ngOnDestroy(): void {
    
  }

}
