import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apps } from '../../../../../core/models/apps';
import { AppsService } from '../../../../../core/services/apps.service';
import { environment } from '../../../../../../environments/environment';
import { SelectOption } from './../../../../../core/models/select-option';
import { NgForm } from '@angular/forms';
import { CommonsService } from './../../../../../core/services/commons.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  
  galeryIcons: any;
  selectedTab: string;
  selectedIcon: string;

  environment = environment;

  constructor(private route: ActivatedRoute,
    protected modalService: NgbModal,
    private commonsService: CommonsService,
    private appsService: AppsService
  ) { }

  ngOnInit(): void {
    this.getGaleryIcons();
    this.selectedTab = 't1';
    this.route.data.subscribe((data) => {
      this.data = data;
    });
    if (!this.app.id) {
      this.app.status = new SelectOption('1');
      this.appStatus = true;
    } else {
      this.appStatus = this.app.status.value == '1' ? true : false;
      this.selectedIcon = `<i class="${this.app.icon}"></i><span class="ms-2">${this.app.icon}</span>`
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
   * Open modal galery icon
   * @param modalRef 
   * @param id 
   */
  openModalGaleryIcon(modalRef:TemplateRef<any>) {
    this.modalService.open(modalRef, {size:'xl'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }  

  /**
   * Close galery modal
   */
    closeGaleryModal(){
    this.modalService.dismissAll();
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
