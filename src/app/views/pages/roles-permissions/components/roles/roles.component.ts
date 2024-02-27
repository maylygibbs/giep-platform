import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { environment } from './../../../../../../environments/environment';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Rol } from './../../../../../core/models/rol';
import { NavigationEnd, Router } from '@angular/router';
import { RolesPermissionsService } from './../../../../../core/services/roles-permissions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends BaseComponent implements OnInit {

  @ViewChild('alertModal') alertModal: TemplateRef<any>;

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

  message:string;

  environment = environment;

  rolesRequest: NodeJS.Timeout;

  private $eventNavigationEnd: Subscription;

  constructor(
    private rolesPermissionsService: RolesPermissionsService,
    private router: Router,
    protected modalService: NgbModal) {
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
    if(!rol.linked){
      this.selectedItem = rol; //await this.rolesPermissionsService.getRolById(rol);
      this.next();
    }else{
      this.message = `El rol ${rol.label} debe ser desvinculado de los usuarios antes de editarlo.`
      this.modalService.open(this.alertModal,{size:'s'})
    }
  }

  /**
   * Delete item
   * @param id 
   */
  async delete(rol: Rol) {
    if(!rol.linked){
      await this.rolesPermissionsService.deleteRole(+rol.id);
      this.loadPage(this.page);
    }else{
      this.message = `El rol ${rol.label} debe ser desvinculado de los usuarios antes de eliminarlo.`
      this.modalService.open(this.alertModal,{size:'s'})
    }

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
    if (this.rolesRequest) {
      clearTimeout(this.rolesRequest);
      this.rolesRequest= null;      
    }
    this.rolesRequest = setTimeout(() => {
      this.loadPage(environment.paginator.default_page);
    }, 300);

  }

  closeModal(){
    this.modalService.dismissAll();
  } 

  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }

}
