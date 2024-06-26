import { environment } from './../../../../../../environments/environment';
import { Section } from './../../../../../core/models/section';
import { Instrument } from './../../../../../core/models/instrument';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { InstrumentsService } from './../../../../../core/services/instruments.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { SelectOption } from '../../../../../core/models/select-option';
import { CommonsService } from '../../../../../core/services/commons.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../core/services/user.service';
import * as XLSX from 'xlsx';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

type AOA = any[][];

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent extends BaseComponent implements OnInit {

  step: number = 1;
  instruments: PaginationResponse;
  assignedUsers : PaginationResponse;

  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;


  totalItems: number;
  page: number = 1;
  pageUser: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: Instrument;
  word: string;
  wordForSearchUSers:string;
  action: string;

  environment = environment;

  idInstrument: number;
  roles?: any[];
  users: Array<any>;
  selectedUsers = [];

  data: any;

  countryId: any;
  stataId: any;
  states: Array<SelectOption>;
  statesForSearchUsers: Array<SelectOption>;
  showLoadingUsers: boolean = false;
  showLoadingCountries: boolean = false;
  showLoadingCountriesForSearchUsers: boolean = false;

  instrumentsRequest: NodeJS.Timeout;
  usersRequest: NodeJS.Timeout;

  countryIdForSearchUsers:any;
  stataIdForSearchUsers:any;
  
  resultValidateUsers: any;
  private $eventNavigationEnd: Subscription;

  drop: any;
  configDropZone: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    maxFilesize: 1,
    ignoreHiddenFiles: false,
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 2,
    addRemoveLinks: true,
    dictDefaultMessage: 'Arrastra el archivo excel con la lista de usuarios o haz click aquí para subirlo.',
    dictRemoveFile: 'Eliminar',
    autoReset: 1000,
    errorReset: 2500,
    cancelReset: null,
    acceptedFiles: '.xlsx, .xls',
    init: () => {
      this.drop = this;
    }
  };

  constructor(private instrumentsService: InstrumentsService,
    private commonsService: CommonsService,
    private route: ActivatedRoute,
    protected modalService: NgbModal,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService) {
    super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
  }

  async ngOnInit() {
    this.instruments = await this.instrumentsService.getInstrumentsPagined({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });
  }

  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.instruments = null;
    this.instruments = await this.instrumentsService.getInstrumentsPagined({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
  }

  async loadPageUsers(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.pageUser = pageInfo;
    this.assignedUsers = null;
    this.assignedUsers = await this.instrumentsService.getAssignedUsers({ 
      page: this.pageUser, 
      rowByPage: environment.paginator.row_per_page, 
      word: this.wordForSearchUSers ? this.wordForSearchUSers : null,
      paisId : this.countryIdForSearchUsers ?  this.countryIdForSearchUsers: null,
      estadoId: this.stataIdForSearchUsers ? this.stataIdForSearchUsers : null,
      idInstrumento:this.idInstrument  
    });
  }

  create() {
    this.selectedItem = new Instrument();
    this.selectedItem.sections = new Array<Section>();
    const section = new Section();
    section.numberSection = 1;
    this.selectedItem.sections.push(section)
    this.next();
  }

  async select(id: number) {
    this.selectedItem = await this.instrumentsService.getInstrumentsByIdForUpdate(id);
    console.log(this.selectedItem)
    this.next();
  }

  /**
   * clone instrument
   */
  async clone(id: number) {
    await this.instrumentsService.clone(id);
    this.loadPage(this.page);
  }

  /**
 * delete instrument
 */
  async delete(id: number) {
    await this.instrumentsService.deleteInstrument(id);
    this.loadPage(this.page);
  }

  next() {
    this.step++;
  }

  back(item: any) {
    this.selectedItem = item;
    if (this.step > 1) {
      this.step--;
    }
    this.loadPage(this.page);
  }

  search() {
    if (this.instrumentsRequest) {
      clearTimeout(this.instrumentsRequest);
      this.instrumentsRequest = null;
    }
    this.instrumentsRequest = setTimeout(() => {
      this.loadPage(environment.paginator.default_page);
    }, 300);
  }

  searchForSearchUsers(){
    if (this.usersRequest) {
      clearTimeout(this.usersRequest);
      this.usersRequest = null;
    }
    this.usersRequest = setTimeout(() => {
      this.loadPageUsers(environment.paginator.default_page);
    }, 300);
  }

  async publishIntrument(instrument: Instrument) {
    await this.instrumentsService.publishInstrument(instrument.id, { publicar: instrument.isPublished ? 1 : 0 });
    this.loadPage(this.page);
  }



  /**
 * Confirm delete / publish instrument
 * @param documento 
 */
  confirm(instrument: Instrument, action: string, modalRef?: TemplateRef<any>) {
    this.selectedItem = instrument;
    this.action = action;
    switch (action) {
      case 'publish':
        this.messageModal = instrument.isPublished ? 'Esta seguro que desea publicar el instrumento?' : 'Esta seguro que desea despublicar el instrumento?';
        break;
      case 'delete':
        this.messageModal = 'Esta seguro que desea eliminar el instrumento?';
        break;
    }
    this.modalService.open(modalRef, {}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

  }

  /**
   * Process event to confirm o not
   * @param result 
   */
  processEvent(result: boolean) {
    if (result) {
      switch (this.action) {
        case 'publish':
          this.publishIntrument(this.selectedItem);
          break;
        case 'delete':
          this.delete(parseInt(this.selectedItem.id));
          break;
      }
    }
    this.selectedItem = null;
    this.action = null;
    this.modalService.dismissAll();
  }

  /**
 * Load users by rol
 */
  async loadUsersByRoles() {
    this.showLoadingUsers = true;
    this.users = await this.instrumentsService.getUsersByRoles(this.arrayToString(this.roles, '|'));
    this.showLoadingUsers = false;
  }


  /**
   * HANDLE MODAL ADD USER REGULAR TO INSTRUMENTS
   * 
   */


  /**
   * Open modal for add users to instruments
   * @param modalRef 
   */
  async openModalUsers(modalRef: TemplateRef<any>, id: number) {
    this.idInstrument = id;
    this.roles = null;
    this.selectedUsers = null;
    this.users = null;
    this.countryId = null;
    this.stataId = null;
    this.loadPageUsers(this.pageUser);
    this.modalService.open(modalRef, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }


  /**
   * Close users modal
   */
  closeAddUsersModal() {
    this.modalService.dismissAll();
    this.selectedUsers = null;
    this.resultValidateUsers = null;
  }


  async onChangeCountry(event: any) {
    this.showLoadingCountries = true;
    this.stataId = null;
    this.states = null;
    this.states = this.countryId ? await this.commonsService.getAllStates(this.countryId) : null;
    this.showLoadingCountries = false;
  }

  async onChangeCountryForSearch(event: any) {
    this.showLoadingCountriesForSearchUsers = true;
    this.stataIdForSearchUsers = null;
    this.statesForSearchUsers = null;
    this.statesForSearchUsers = this.countryIdForSearchUsers ?  await this.commonsService.getAllStates(this.countryIdForSearchUsers) : null
    this.loadPageUsers(this.pageUser);
    this.showLoadingCountriesForSearchUsers = false;
  }

  async onChangeStateForSearch(event: any) {
    this.loadPageUsers(this.pageUser);
  }


  /**
   * Add users to instrument
   * @param form 
   */
  async addUsers(form: NgForm) {
    if (form.valid) {

     await this.instrumentsService.addUsersToInstrument(this.idInstrument, {
        users: Instrument.getUsers(this.selectedUsers),
        estadoId: this.stataId,
        paisId: this.countryId 
      });

      this.loadPageUsers(environment.paginator.default_page);

    }
  }

    /**
   * Add users to instrument
   * @param form 
   */
    async addUsersMasive(form: NgForm) {
      if (form.valid) {
  
        if(!this.resultValidateUsers || !this.resultValidateUsers.usuariosregistrados || this.resultValidateUsers.usuariosregistrados.length == 0){
          this.setInputColorError('Indique al menos un usuario');
          return;
        }
  
        await this.instrumentsService.addUsersToInstrument(this.idInstrument, {
          users: this.resultValidateUsers.usuariosregistrados.map((user)=> {return {userId: +user.id}}),
          estadoId: this.stataId,
          paisId: this.countryId 
        });
  
        this.loadPageUsers(environment.paginator.default_page);
  
      }
    }

  /**
   * Change order of instrument
   * @param order 
   * @param id 
   */
  async onChangeInputOrder(order: string, id: number) {
    const divError: HTMLElement = document.getElementById('order-' + id);
    if (!isNaN(Number(order))) {
      if (Number(order) > 0) {
        await this.instrumentsService.changeOrderOfInstrument(id, order);
      } else {
        divError.style.display = 'inline-block';
        setTimeout(() => {
          divError.style.display = 'none';
        }, 1500);
      }

    } else {
      console.log('order', order);
      divError.style.display = 'inline-block';
      setTimeout(() => {
        divError.style.display = 'none';
      }, 1500);
    }
  }


  prueba(event: any) {
    console.log('event', event)
  }

    /**
  * Handle error in upload action
  * @param event 
  */
    onUploadError(event: any): void {
      console.log('onUploadError:', event);
      //this.disableBtnSubmit = true;
      if (event[1] == "You can't upload files of this type.") {
        this.toastrService.error('Documento con extensión no permitida. Sólo se permiten archivos con las siguientes extensiones: xls, xlsx')
      }
      if (event[1] == "File is too big (2.87MiB). Max filesize: 2MiB.") {
        this.toastrService.error('El documento es demasiado grande. Tamaño máximo de docuemento: 10MB.')
      }
    }
  
    /**
  * Handle success in upload action
  * @param event 
  */
    onUploadSuccess(event: any): void {
      
      console.log(event)
    }
  
    /**
   * Handle add file action
   * @param event 
   */
    addFile(event: any) {
      this.resultValidateUsers = null;
      let file: File = event;
      console.log('event:', event);
      console.log('file name:', file.name);
      console.log('file type:', file.type);
      const thisTemp = this;
      if (file) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = async() => {
          /* read workbook */
          const result: string = reader.result as string;
          const wb: XLSX.WorkBook = XLSX.read(result, { type: 'binary' });
  
           /* grab first sheet */
          const wsname: string = wb.SheetNames[0];
          const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
           /* save data */
          const data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, blankrows: false }));
  
          if (data.length === 0) {
  
            thisTemp.toastrService.error('Favor verifique, el archivo está vacío.')
  
            return false;
          }else{
            console.log('data',data);
            const users = data.map((user)=> {return user[0]})
            thisTemp.resultValidateUsers = await thisTemp.userService.validUsers({users});
            if(thisTemp.resultValidateUsers && thisTemp.resultValidateUsers.usuariosregistrados && thisTemp.resultValidateUsers.usuariosregistrados.length > 0){

  
            }
  
          }
  
        };
        reader.onerror = (error) => {
          this.toastrService.error('Error al analizar lista de usuarios.');
          console.log(error);
        };
      }
    }
  
  
    /**
  * Reset zone drag and drop
  */
    resetDropzoneUploads() {
      this.resultValidateUsers = null;
  
    }

  /**
   * Get masive users from file
   */
  /*getMasiveUsers(){
    if(this.resultValidateUsers && this.resultValidateUsers.usuariosregistrados && this.resultValidateUsers.usuariosregistrados.length > 0){
      if(this.eventDetail.usersInvited && this.eventDetail.usersInvited.length > 0){
        this.registeredUsers = this.resultValidateUsers.usuariosregistrados.filter((user:any)=> {
          return !this.eventDetail.usersInvited.includes(user.correo);
        });  
        if(this.registeredUsers.length > 0){
          const temp = this.registeredUsers.map((user)=> {return user.correo});
          this.eventDetail.usersInvited = [...this.eventDetail.usersInvited, ...temp];
        }       
      }else{
        this.eventDetail.usersInvited = this.resultValidateUsers.usuariosregistrados.map((user)=> {return user.correo});
      }
    }
  }    */

  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }

}
