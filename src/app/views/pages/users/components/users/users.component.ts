import { environment } from './../../../../../../environments/environment';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { User } from './../../../../../core/models/user';
import { UserService } from './../../../../../core/services/user.service';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent extends BaseComponent implements OnInit {

  @ViewChild('inputFile')
  inputFile: ElementRef;

  defaultView: boolean = true;
  step: number = 1;
  users: PaginationResponse;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;

  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: User;
  word: string;

  environment = environment;

  private $eventNavigationEnd: Subscription;


  constructor(private userService: UserService,
    private router: Router,
    private toastrService: ToastrService) {
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
    this.users = await this.userService.getUsersPaginated({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
  }

  create() {
    this.selectedItem = new User();
    this.next();
  }

  /**
   * Active input file event
   */
  preUploadFile() {
    this.inputFile.nativeElement.click();
  }

    /**
   * Upload image avatar
   * @param file 
   */
  async uploadUsers(event) {
    let file: File = event.target[`files`][0];
    if (file) {
      const nameFile = file.name;

      let extArray = nameFile.split('.');
      let ext = extArray[extArray.length - 1];
      const filters = environment.form.file_extension_excel.filter((element: string) => element.toLowerCase().includes(ext.toLowerCase()));
      if(filters.length == 0){
        this.toastrService.error('Archivo no permitido. Solo se permiten archivos con extensión .xlsx y .xls');
      }else{
        const formData = new FormData();
        formData.append("users", file);
        const upload = await this.userService.uploadUsers(formData);
        this.inputFile.nativeElement.value = null;
      }

    }
  }

  /**
   * Select user
   * @param id 
   */
  async select(id: number) {
    this.selectedItem = await this.userService.getUserById(id);
    this.next();
  }

  /**
   * Delete user by id
   * @param id 
   */
  async delete(id: number) {
    await this.userService.deleteUser(id);
    this.loadPage(this.page);
  }

  /**
   * Handle next step
   */
  next() {
    this.step++;
  }

  /**
   * Handle step to back
   * @param item 
   */
  back(item: any) {
    this.selectedItem = item;
    this.step--;
    this.loadPage(this.page);
  }

  /**
   * search by word
   */
  search() {
    if (this.word && this.word.length > 0) {
      this.loadPage(environment.paginator.default_page);
    }
  }

  /**
   * Change view
   * @param change 
   */
  changeView(change: boolean) {
    this.defaultView = change;
  }


  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }

}
