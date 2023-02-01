import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apps } from '../../../../../core/models/apps';
import { AppsService } from '../../../../../core/services/apps.service';
import { environment } from '../../../../../../environments/environment';
import { SelectOption } from './../../../../../core/models/select-option';
import { NgForm } from '@angular/forms';
import { CommonsService } from './../../../../../core/services/commons.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from './../../../../../core/models/menu.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-app-store',
  templateUrl: './app-store.component.html',
  styleUrls: ['./app-store.component.scss']
})
export class AppStoreComponent implements OnInit {

  @Input()
  app: Apps;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();

  appStatus: boolean;

  data: any;

  menuItems?:Array<MenuItem>;

  galeryIcons: any;
  selectedTab: string;
  selectedIcon: string;
  selectedFather: string;

  environment = environment;

  constructor(private route: ActivatedRoute,
    protected modalService: NgbModal,
    private commonsService: CommonsService,
    private appsService: AppsService,
    private toastrService: ToastrService
  ) { }

  async ngOnInit() {
    this.getGaleryIcons();
    this.selectedTab = 't1';
    this.route.data.subscribe((data) => {
      this.data = data;
    });
    this.menuItems = await this.commonsService.getAllMenuOptions();
    
    if (!this.app.id) {
      this.app.status = new SelectOption('1');
      this.appStatus = true;
      this.app.parent = new SelectOption();
    } else {
      this.appStatus = this.app.status.value == '1' ? true : false;
      this.selectedIcon = this.app.icon ? `<i class="${this.app.icon}"></i><span class="ms-2">${this.app.icon}</span>` : null;
      this.selectedFather = this.app.parent ? this.app.parent.label : null;
    }
  }

  /**
 * Handle event change status
 * @param event 
 */
  onChangeStatus(event: any) {
    this.app.status = this.appStatus == true ? new SelectOption('1') : new SelectOption('2');
  }


  /**
* Select an tab
* @param tabId 
*/
  selectTab(tabId: string) {
    this.selectedTab = tabId;
  }

  /**
  * Select icon
  * @param icon 
  */
  selectIcon(icon: SelectOption) {
    this.selectedIcon = `<i class="${icon}"></i><span class="ms-2">${icon}</span>`
    this.app.icon = icon.value;
    this.closeModal();
  }

  /**
   * Clear icon
   */
  clearInputIcon(){
    this.selectedIcon = null
    this.app.icon = null;
  }

  /**
 * load actual galeria icon
 */
  getGaleryIcons() {
    this.commonsService.getAllGaleryIcon().then((resp) => {
      this.galeryIcons = resp;     
    })
  }


  /**
   * Open modal generic
   * @param modalRef 
   */
  openModal(modalRef: TemplateRef<any>) {
    this.modalService.open(modalRef, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }



  /**
   * Close modal
   */
  closeModal() {
    this.modalService.dismissAll();
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }


  /**
   * Select parent item
   * @param item 
   */
  selectParent(item : MenuItem){
    if(item.id != this.app.parent?.id){
      this.app.parent = new SelectOption(String(item.id), item.label);
      this.selectedFather = item.label;
      this.closeModal();
    } 
  }
  
  
   /**
   * Clear parent
   */
    clearInputParent(){
      this.selectedFather = null;
      this.app.parent = new SelectOption();
      this.app.icon = null;
    } 

    /**
     * Show warning message
     */
    selectParentWarning(){
      this.toastrService.warning('No es posible seleccionar esta opción como padre. El menú de opciones soporta sólo tres (3) niveles');
    }


  /**
  * Submit form rol
  * @param form 
  */
  async onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('app', this.app);
      console.log('app post', Apps.mapForPost(this.app));
      await this.appsService.storeApp(Apps.mapForPost(this.app));
      this.back();
    }

  }

  /**
 * Return to back page
 */
  back() {
    this.onBack.emit(null);
  }

}
