import { Component, OnInit } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { environment } from './../../../../../../environments/environment';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Rol } from './../../../../../core/models/rol';
import { NavigationEnd, Router } from '@angular/router';
import { RolesPermissionsService } from './../../../../../core/services/roles-permissions.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends BaseComponent implements OnInit {

  step: number = 1;
  roles: PaginationResponse;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;


  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: Rol;
  word: string;

  environment = environment;

  private $eventNavigationEnd: Subscription;

  constructor(
    private rolesPermissionsService: RolesPermissionsService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.loadPage(environment.paginator.default_page);
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });
  }

  /**
 * Load items page by page
 * @param pageInfo 
 */
  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.roles = null;
    this.roles = await this.rolesPermissionsService.getRolesPagined({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
  }

  /**
 * Create item
 */
  create() {
    this.selectedItem = new Rol();
    this.next();
  }

  /**
   * Select item
   * @param id 
   */
  async select(rol: Rol) {
    this.selectedItem = rol; //await this.rolesPermissionsService.getRolById(rol);
    this.next();
  }

  /**
   * Delete item
   * @param id 
   */
  async delete(id: number) {
    await this.rolesPermissionsService.deleteRole(id);
    this.loadPage(this.page);
  }

  /**
 * Next step
 */
  next() {
    this.step++;
  }

  /**
   * Back step
   * @param item 
   */
  back(item: any) {
    this.selectedItem = item;
    this.step--;
    this.loadPage(this.page);
  }

  /**
  * Search item
  */
  search() {
    if (this.word && this.word.length > 0) {
      this.loadPage(environment.paginator.default_page);
    }
  }


  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }

}
