import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { filter, Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { DocumentGiep } from '../../../../../core/models/document';
import { DocumentService } from '../../../../../core/services/document.service';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import * as saveAs from 'file-saver';
import { SelectOption } from '../../../../../core/models/select-option';
import { InstrumentsService } from '../../../../../core/services/instruments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent extends BaseComponent implements OnInit {

  documents: PaginationResponse;
  defaultView: boolean = true;
  step: number = 1;


  fileContent: string | ArrayBuffer;
  dataFile: any;


  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;


  selectedItem: DocumentGiep;
  word: string;

  environment = environment;
  drop: any;
  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 2,
    maxFilesize: 10,
    ignoreHiddenFiles: false,
    autoProcessQueue: false,
    uploadMultiple: true,
    parallelUploads: 2,
    addRemoveLinks:true,
    dictDefaultMessage: 'Arrastra el documento o haz click aquí para subirlo.',
    dictRemoveFile: 'Eliminar',
    autoReset: 1000,
    errorReset: 2500,
    cancelReset: null,
    acceptedFiles:'.docx, .doc, .pdf, .xls, .xlsx, .odt, .odp, .ods, .ppt, .pptx, .png, .jpg, .jpeg, .gif y .mp4',
    init: () => {
      this.drop = this;
    }
    
  };


  private $eventNavigationEnd: Subscription;
  @ViewChild('fileForm') fileForm: NgForm;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  @ViewChild('dropzone') dropzone?: any;

  doc: DocumentGiep;
  fileToUpload: File;
  documentStatus: boolean = false;
  showLoading: boolean = false;
  users: Array<any>;
  selectedUsers = [];
  disableBtnSubmit:boolean=false;

  documentRequest:NodeJS.Timeout;

  constructor(private documentService: DocumentService,
    private instrumentsService: InstrumentsService,
    private toastrService: ToastrService,
    protected modalService: NgbModal,
    private router: Router) {
    super();
  }

  async ngOnInit() {

    this.documents = await this.documentService.getDocumentPaginated({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });
  }

  /**
   * Handle error in upload action
   * @param event 
   */
  onUploadError(event: any): void {
    console.log('onUploadError:', event);
    this.disableBtnSubmit = true;
    if(event[1]=="You can't upload files of this type."){
      this.toastrService.error('Documento con extensión no permitida. Sólo se permiten documentos con las siguientes extensiones: docx, doc, pdf, xls, xlsx, odt, ods, odp, ppt, pptx, png, jpg, jpeg, gif y mp4.')
    }
    if(event[1]=="File is too big (2.87MiB). Max filesize: 2MiB."){
      this.toastrService.error('El documento es demasiado grande. Tamaño máximo de docuemento: 10MB.')
    }
    

  }

  /**
 * Handle success in upload action
 * @param event 
 */
  onUploadSuccess(event: any): void {
    let file: File = event[0]
    console.log('onUploadSuccess:', event);
    console.log('onUploadSuccess:', file.name);
    console.log('onUploadSuccess:', file.type);
    if (file.name === '.ORIG_HEAD' && !file.type) {
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function (x) {
        self.fileContent = fileReader.result;
        console.log('onUploadSuccess:', self.fileContent);
      }
      fileReader.readAsText(file);
    } else {
      const dataFile = { file: file.name };
      if (this.fileContent) {
        Object.assign(dataFile, { orig_head: this.fileContent })
      }
      console.log('onUploadSuccess:', dataFile);
    }
    this.disableBtnSubmit = false;
  }

  /**
   * Handle add file action
   * @param event 
   */
  addFile(event: any) {
    console.log('addFile:', event);

    let file: File = event;
    console.log('event:', event);
    console.log('file name:', file.name);
    console.log('file type:', file.type);
    if (file.name === '.ORIG_HEAD' && !file.type) {
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function (x) {
        self.fileContent = fileReader.result;
        if (!self.dataFile) {
          self.dataFile = {};
        }
        Object.assign(self.dataFile, { orig_head: self.fileContent })
      }
      fileReader.readAsText(file);
    } else {
      if (!this.dataFile) {
        this.dataFile = {};
      }
      Object.assign(this.dataFile, { fileName: file.name });
      Object.assign(this.dataFile, { fileSize: file.size });
      Object.assign(this.dataFile, { fileType: file.type });
      this.fileToUpload = file;
    }
    if (this.fileContent) {
      console.log('fileContent:', this.fileContent);
      Object.assign(this.dataFile, { orig_head: this.fileContent })
    }
    console.log('dataFile:', this.dataFile);
    this.disableBtnSubmit = false;
  }


  onChangeStatus(event: any) {
    this.doc.state = this.documentStatus == true ? new SelectOption('1') : new SelectOption('0');
  }

  /**
   * Reset zone drag and drop
   */
  resetDropzoneUploads() {
      this.dataFile = null;
      this.fileForm.resetForm();
  }

  /**
   * Select document by id and show datails
   * @param id 
   * @param modalRef 
   */
  async select(id: string, modalRef?: TemplateRef<any>) {
    this.selectedItem = await this.documentService.getDocumentById(id);
    this.openInfoModal(modalRef);
  }

  async delete(id: number) {
    //await this.userService.deleteUser(id);
    //this.loadPage(this.page);
  }

  next() {
    this.step++;
  }

  back(item: any) {
    this.selectedItem = item;
    this.step--;
    //this.loadPage(this.page);
  }

  /**
   * Sear by word the documents
   */
  search() {

    if(this.documentRequest){
      clearTimeout(this.documentRequest);
      this.documentRequest = null;      
    }

    this.documentRequest = setTimeout(() => {
      this.loadPage(environment.paginator.default_page);
    }, 300);

  }

  /**
   * Change views
   * @param change 
   */
  changeView(change: boolean) {
    this.defaultView = change;
  }

  /**
   * Load page by page
   * @param pageInfo 
   */
  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.documents = null;
    this.documents = await this.documentService.getDocumentPaginated({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
  }


  /**
   * Open zone drag and drop
   * @param event 
   * @param modalRef 
   */
  openZoneDragDropFiles(event: any, modalRef?: TemplateRef<any>) {
    this.doc = new DocumentGiep();
   this.disableBtnSubmit = true;
    this.modalService.open(modalRef, { size: 'lg', windowClass: 'modal-file' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  /**
   * Opem info modal od document
   * @param modalRef 
   */
  openInfoModal(modalRef?: TemplateRef<any>) {
    this.modalService.open(modalRef, { size: 'sm', windowClass: 'modal-file' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  /**
   * Close modal
   */
  closeModal() {
    this.modalService.dismissAll();
    this.resetDropzoneUploads();
    this.doc = new DocumentGiep();
  }

  /**
   * Handle file upload submit event
   * @param form 
   */
  async onFilesUpload(form: NgForm) {
    if (form.valid) {
      console.log('dataFile onFilesUpload: ', this.dataFile);

      if (this.fileToUpload) {
        const formData = new FormData();
        const hashtag: Array<string> = this.doc.hashtag.map((item: any) => {
          return item.value.trim().toLowerCase();
        })
        formData.append("archivo", this.fileToUpload);
        formData.append("titulo", this.doc.title);
        formData.append("nombre_original", this.dataFile.fileName);
        formData.append("descripcion_archivo", this.doc.description);
        formData.append("tamano", this.dataFile.fileSize);
        formData.append("hashtag", JSON.stringify(hashtag));
        formData.append("publico", this.doc.state ?  this.doc.state.value : '0');
        formData.append("idestado", '3');
        formData.append("users", null);
        const upload = await this.documentService.uploadFile(formData);
        if (upload) {
          this.loadPage(environment.paginator.default_page);
          this.closeModal();

        }

      }
    }
  }

  /**
   * Download document for only reading
   * @param id 
   */
  async download(id: string) {
    const resp = await this.documentService.download(id);
    if (resp) {
      let file = this.convertBase64ToFile(resp.file, resp.title);
      saveAs(file, resp.title + '.' + resp.extension);
    }
  }


    /**
   * Download document of history
   * @param id 
   */
     async downloadFileHistorico(id: string) {
      const resp = await this.documentService.downloadFileHistorico(id);
      if (resp) {
        let file = this.convertBase64ToFile(resp.file, resp.title);
        saveAs(file, resp.title + '.' + resp.extension);
      }
    }


  /**
   * Load users by rol
   */
  async loadUsersByRoles() {
    this.showLoading = true;
    this.users = await this.instrumentsService.getUsersByRoles(null);
    this.showLoading = false;
  }

  prueba(){
    console.log('eliminado')
  }


  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }

}
