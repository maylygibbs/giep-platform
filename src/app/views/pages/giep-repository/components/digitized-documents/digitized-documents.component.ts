import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { filter, Subscription } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { PaginationResponse } from '../../../../../core/models/pagination-response';
import { DocumentGiep } from '../../../../../core/models/document';
import { DocumentService } from '../../../../../core/services/document.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import * as saveAs from 'file-saver';
import { InstrumentsService } from '../../../../../core/services/instruments.service';
import { ToastrService } from 'ngx-toastr';
import { SelectOption } from 'src/app/core/models/select-option';
import * as moment from 'moment';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-digitized-documents',
  templateUrl: './digitized-documents.component.html',
  styleUrls: ['./digitized-documents.component.scss']
})
export class DigitizedDocumentsComponent extends BaseComponent implements OnInit, OnDestroy {

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
    addRemoveLinks: true,
    dictDefaultMessage: 'Arrastra el documento o haz click aquí para subirlo.',
    dictRemoveFile: 'Eliminar',
    autoReset: 1000,
    errorReset: 2500,
    cancelReset: null,
    acceptedFiles: '.pdf',
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
  disableBtnSubmit: boolean = false;

  documentRequest: NodeJS.Timeout;

  data: any;

  stateId: number;

  defaultNavActiveId = 1;

  stateList: any;
  direccionAlmacenList: any;
  tipoAlamacen: any;
  ubicacionList: any;
  nivelUnidadList: any;
  estructuraOrganizativaList: any;
  regionList: any;
  paisList: any;
  estadoList: any;
  ciudadList: any;
  gerenciasList: any;
  tieneArchivoDigitalList: any;
  contenidoCajaList: any;
  serieList: any;
  subSerieList: any;
  estadoConservacionList: any;
  expendienteDocumentalList: any;
  tipoMateriaRecibidoList: any;
  tieneFechasExtremaslList: any;
  showLoadingTipoAlmacen: boolean = false;
  showLoadingEstructuraList: boolean = false;
  showLoadingEstadoList: boolean = false;
  showLoadingCiudadList: boolean = false;
  showLoadingSubSerieList: boolean = false;
  maxDate: NgbDateStruct;
  haveFisicFile: boolean = true;
  haveExpedienteDocumental: boolean = true;
  haveFechasExtremas: boolean = true;

  urlPdf: any;

  constructor(private documentService: DocumentService,
    private instrumentsService: InstrumentsService,
    private toastrService: ToastrService,
    protected modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute) {
    super();
    this.route.data.subscribe((data) => {
      this.data = data;
    });
    this.maxDate = this.getDateToStructure(new Date());
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
  }

  async ngOnInit() {    
    this.step = 1;
    this.loadAllList();
    this.documents = await this.documentService.getDigitalizedDocumentsPaginated({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
    
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });
  }



  async loadAllList() {
    
    this.stateList = await this.documentService.getStateList();
    this.direccionAlmacenList = await this.documentService.getDireccionAlmacenList();
    this.ubicacionList = await this.documentService.getUbicacionList();
    this.nivelUnidadList = await this.documentService.getNivelUnidadList();
    this.regionList = await this.documentService.getRegionList();
    this.paisList = await this.documentService.getPaisList();
    this.gerenciasList = await this.documentService.getGerenciasList();
    this.tieneArchivoDigitalList = await this.documentService.getTieneArchivoDigitalList();
    this.tipoMateriaRecibidoList = await this.documentService.getTipoMaterialList();
    this.contenidoCajaList = await this.documentService.getContenidoCajaList();
    this.serieList = await this.documentService.getSerieList();
    this.estadoConservacionList = await this.documentService.getEstadoConservacionList();
    this.expendienteDocumentalList = await this.documentService.getExpendienteDocumentalList();
    this.tieneFechasExtremaslList = await this.documentService.getTieneFechasExtremaslList();

    this.init();

  }

  init(){  
    this.haveFisicFile = true;
    this.haveExpedienteDocumental = true;
    this.haveFechasExtremas = true;  
    if (!this.dataFile) {
      this.dataFile = {};
    }
    Object.assign(this.dataFile, { tieneArchivoFisico: new SelectOption('0','Sí')});
    Object.assign(this.dataFile, { expedienteDocumental: new SelectOption('1','Sí')});
    Object.assign(this.dataFile, { tieneFechasExtremas: new SelectOption('1','Sí')});
    
  }

  /**
   * Handle error in upload action
   * @param event 
   */
  onUploadError(event: any): void {
    console.log('onUploadError:', event);
    this.disableBtnSubmit = true;
    if (event[1] == "You can't upload files of this type.") {
      this.toastrService.error('Documento con extensión no permitida. Sólo se permiten documentos con las siguientes extensiones: pdf')
    }
    if (event[1] == "File is too big (2.87MiB). Max filesize: 2MiB.") {
      this.toastrService.error('El documento es demasiado grande. Tamaño máximo de docuemento: 10MB.')
    }
    this.doc = new DocumentGiep();
    this.selectedUsers = null;
    this.documentStatus = false;
    this.dataFile = null;
    this.fileContent = null;

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

    if (file.name === '.ORIG_HEAD.txt' && file.type && file.type.includes('text')) {
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function (x) {
        self.fileContent = fileReader.result;
        if (!self.dataFile) {
          self.dataFile = {};
        }

        Object.assign(self.dataFile, { orig_head: self.fileContent.toString() })
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
    this.doc.isPublic = this.documentStatus == true ? true : false;
  }

  /**
   * Reset zone drag and drop
   */
  resetDropzoneUploads() {
    this.dataFile = null;
    this.fileForm?.resetForm();
    this.doc = new DocumentGiep();
    this.selectedUsers = null;
    this.documentStatus = false;
    this.dataFile = null;
    this.fileContent = null;
  }

  /**
   * Select document by id and show datails
   * @param id 
   * @param modalRef 
   */
  async select(id: string, modalRef?: TemplateRef<any>) {
    this.selectedItem = await this.documentService.getDigitalizedDocumentByIdDetalle(id);
    this.openInfoModal(modalRef);
  }

  async delete(id: number) {
    await this.documentService.deleteDocument(id);
    this.loadPage(this.page);
  }

  next() {
    this.step++;
  }

  back(item: any) {
    this.selectedItem = item;
    this.step--;
    this.defaultNavActiveId = 1;
    this.dataFile = null;
    this.loadAllList();
    this.loadPage(this.page);
  }

  /**
   * Sear by word the documents
   */
  search() {

    if (this.documentRequest) {
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
    this.documents = await this.documentService.getDigitalizedDocumentsPaginated({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null });
  }


  /**
   * Open zone drag and drop
   * @param event 
   * @param modalRef 
   */
  openZoneDragDropFiles(event: any, modalRef?: TemplateRef<any>) {
    this.doc = new DocumentGiep();
    this.disableBtnSubmit = true;
    this.step++;
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
    this.selectedUsers = null;
    this.documentStatus = false;
    this.dataFile = null;
    this.fileContent = null;

  }

  /**
   * Handle file upload submit event
   * @param form 
   */
  async onFilesUpload(form: NgForm) {

    if (this.isFormValid(form)) {
      console.log('dataFile onFilesUpload: ', this.dataFile);

      if (this.fileToUpload) {

        const formData = new FormData();
        let hashtag: Array<string> = null
        if (!this.fileContent) {
          hashtag = this.dataFile.hashtag.map((item: any) => {
            return item.value.trim().toLowerCase();
          })
        }

        formData.append("archivo", this.fileToUpload);

        formData.append("titulo", !this.fileContent ? this.dataFile.title : null);
        formData.append("descripcion_archivo", !this.fileContent ? this.dataFile.description : null);
        formData.append("hashtag", !this.fileContent ? JSON.stringify(hashtag) : null);
        formData.append("publico", !this.fileContent ? (this.dataFile.isPublic ? '1' : '0') : null);
        formData.append("users", !this.fileContent ? (this.dataFile.isPublic ? JSON.stringify(this.selectedUsers) : null) : null);

        formData.append("comentarios", !this.fileContent ? null : this.dataFile.comments);
        formData.append("nemotecnico", !this.fileContent ? null : this.dataFile.orig_head);
        formData.append("nombre_original", this.dataFile.fileName);
        formData.append("tamano", this.dataFile.fileSize);


        formData.append("id_pais", this.dataFile.pais.value);
        formData.append("id_estado", this.dataFile.estado.value);
        formData.append("id_ciudad", this.dataFile.ciudad.value);


        formData.append("sw_archivo_fisico", this.dataFile.tieneArchivoFisico.value);
        formData.append("id_tipo_almacen", this.dataFile.tieneArchivoFisico.value == '0' ? this.dataFile.almacenType.value : null);
        formData.append("idubica1", this.dataFile.tieneArchivoFisico.value == '0' ? this.dataFile.location1.value : null);
        formData.append("idubica2", this.dataFile.tieneArchivoFisico.value == '0' ? this.dataFile.location2.value : null);
        formData.append("idubica3", this.dataFile.tieneArchivoFisico.value == '0' ? this.dataFile.location3.value : null);
        formData.append("idubica4", this.dataFile.tieneArchivoFisico.value == '0' ? this.dataFile.location4.value : null);


        formData.append("id_estructura_organizativa", this.dataFile.estructuraOrganizativa.value);
        formData.append("id_user_entrega", this.dataFile.usuarioEntrega);

        formData.append("idestadoconservacion", this.dataFile.estadoConservacion.value);
        formData.append("idmaterialrecibido", this.dataFile.tipoMaterial.value);
        formData.append("idcontenido_caja", this.dataFile.contenidoCaja ? this.dataFile.contenidoCaja.value : null);
        formData.append("num_dela_caja", this.dataFile.numCaja);
        formData.append("num_dela_estuches", this.dataFile.numEstuche);


        formData.append("num_expediente", this.dataFile.expedienteDocumental.value == '1' ? this.dataFile.numExpediente : null);
        formData.append("Fecha_extrema_inicio", this.dataFile.tieneFechasExtremas.value == '1' ? this.getDateStructureToDate(this.dataFile.fechaExtremaInicio) : null); 
        formData.append("Fecha_extrema_fin", this.dataFile.tieneFechasExtremas.value == '1' ? this.getDateStructureToDate(this.dataFile.fechaExtremaFin) : null);
        formData.append("fecha_documento", this.dataFile.tieneFechasExtremas.value == '0' ? this.getDateStructureToDate(this.dataFile.fechaDocumento) : null);
        formData.append("fecha_fin_conservac", this.getDateStructureToDate(this.dataFile.fechaFinConservacion));
        formData.append("codigo_serie_subserie", this.dataFile.subSerie.value);



        formData.append("folios", this.dataFile.folios); 
        formData.append("asuntos", this.dataFile.asuntos);        
        formData.append("argumento_justificacion", this.dataFile.justificacion);        
        formData.append("cantidad_caja", '1');        
        formData.append("id_status_tipoestado", '1');

        console.log('this.dataFile', this.dataFile);

        const values: { [key: string]: any } = {};

        formData.forEach((value, key) => {
          values[key] = value;
        });

        console.log('FormData', values);

        const upload = await this.documentService.uploadDigitalizedFile(formData);
        if (upload) {
          this.loadPage(environment.paginator.default_page);
          this.back(null);

        }

      }else{
        this.toastrService.warning('Suba el documentos digitalizado.');
      }
    }else{
      this.toastrService.warning('Complete los datos del documento. Los campos marcados con asteriscos son obligatorio.');
      
    }
  }

  /**
   * pull document for only versionar
   * @param id 
   */
  async pull(id: string) {
    const resp = await this.documentService.pull(id);
    if (resp) {
      let file = this.convertBase64ToFile(resp.file, resp.title);
      saveAs(file, resp.title + '.' + resp.extension);
      this.loadPage(this.page);
    }
  }

  /**
 * pull document for only versionar
 * @param id 
 */
  async pullFromModal(doc: DocumentGiep) {
    const resp = await this.documentService.pull(doc.id);
    if (resp) {
      doc.isBloqued = true;
      let file = this.convertBase64ToFile(resp.file, resp.title);
      saveAs(file, resp.title + '.' + resp.extension);
      this.loadPage(this.page);
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

  /**
   * File unlock process
   * @param id 
   */
  async documentUnlock(id: string) {
    const resp = await this.documentService.documentUnlock(id);
    this.loadPage(this.page);
  }

  /**
 * File unlock process
 * @param id 
 */
  async documentUnlockFromModal(doc: DocumentGiep) {
    const resp = await this.documentService.documentUnlock(doc.id);
    if (resp) {
      doc.isBloqued = false;
    }
    this.loadPage(this.page);
  }

  /** Process change state document **/
  async onProcessStageSubmit(form: NgForm, doc: DocumentGiep) {
    if (form.valid) {
      await this.documentService.documentChangeState(parseInt(doc.id), this.stateId, doc.comments);
      this.closeModal();
      this.loadPage(this.page);
    }
  }

  /**
   * Get tipo de almace dado el id de Almacen
   */
  async getTipoAlmacent() {
    this.showLoadingTipoAlmacen = true;
    this.tipoAlamacen = await this.documentService.getTipoAlmacenList(this.dataFile.almacen.value);
    this.showLoadingTipoAlmacen = false;
  }


  /**
 * Get estructura organizativa dado el nivel
 */
  async getEstructuraOrganizativaList() {
    this.showLoadingEstructuraList = true;
    console.log('his.dataFile.nivelunidad', this.dataFile.nivelUnidad)
    this.estructuraOrganizativaList = await this.documentService.getEstructuraOrganizativaList(this.dataFile.nivelUnidad.value);
    this.showLoadingEstructuraList = false;
  }


  /**
* Get estados
*/
  async getEstadoList() {
    this.showLoadingEstadoList = true;
    console.log('his.dataFile.pais', this.dataFile.pais)
    this.estadoList = await this.documentService.getEstadosList(this.dataFile.pais.value);
    this.showLoadingEstadoList = false;
  }


  /**
* Get ciudades
*/
  async getCiudadList() {
    this.showLoadingCiudadList = true;
    console.log('his.dataFile.estado', this.dataFile.estado)
    this.ciudadList = await this.documentService.getCiudadList(this.dataFile.estado.value);
    this.showLoadingCiudadList = false;
  }

  /**
* Get series
*/
  async getSubSerieList() {
    this.showLoadingSubSerieList = true;
    this.subSerieList = await this.documentService.getSubSerieList(this.dataFile.serie.value);
    this.showLoadingSubSerieList = false;
  }

  /**
   * EstadoConservacionList
   */
  async getEstadoConservacionList() {
    this.subSerieList = await this.documentService.getEstadoConservacionList();
  }



  /**
   * convert date to ngb estructure
   * @param moment 
   */
  getDateToStructure(date: Date) {
    const dateMoment = date ? moment(date) : moment();
    return { year: dateMoment.year(), month: dateMoment.month() + 1, day: dateMoment.date() };
  }

  /**
 * * convert ngb estructure to date to
 * @param moment 
 */
  getDateStructureToDate(structure: any) {
    const year = structure.year;
    const month = structure.month <= 9 ? `0${structure.month}` : structure.month;
    const day = structure.day <= 9 ? `0${structure.day}` : structure.day;
    return   `${year}-${month}-${day}`;
  }


  /**
   * Viwer PDF
   */
 async openDocument(modalRef: TemplateRef<any>, url: string) {
    this.urlPdf = await this.documentService.getBinaryDoc('assets/4-20241102043159.pdf');
    this.modalService.open(modalRef, { size: 'sm', windowClass: 'modal-file' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
    //this.step = 3;
  }


  setHaveFisicFile(){
    this.haveFisicFile = this.dataFile.tieneArchivoFisico.value == '0' ? true : false;
    if(!this.haveFisicFile){
      this.dataFile.almacen = null;
      this.dataFile.almacenType = null;
      this.dataFile.location1 = null;
      this.dataFile.location2 = null;
      this.dataFile.location3 = null;
      this.dataFile.contenidoCaja = null;
      this.dataFile.numCaja = null;
      this.dataFile.numEstuche = null;
    }
  }

  clearHaveFisicFile(){
    this.haveFisicFile = false;
    this.dataFile.almacen = null;
    this.dataFile.almacenType = null;
    this.dataFile.location1 = null;
    this.dataFile.location2 = null;
    this.dataFile.location3 = null;
    this.dataFile.contenidoCaja = null;
    this.dataFile.numCaja = null;
    this.dataFile.numEstuche = null;
  }

  setHaveExpedienteDocumental(){
    this.haveExpedienteDocumental = this.dataFile.expedienteDocumental.value == '1' ? true : false;
    if(!this.haveExpedienteDocumental){
      this.dataFile.numExpediente = null;
    }
  }

  clearHaveExpedienteDocumental(){
    this.haveExpedienteDocumental = false;
    this.dataFile.numExpediente = null;
  }

  setHaveFechasExtremas(){
    this.haveFechasExtremas = this.dataFile.tieneFechasExtremas.value == '1' ? true : false;
    this.dataFile.fechaExtremaInicio = null;
    this.dataFile.fechaExtremaFin = null;
    this.dataFile.fechaDocumento = null;
  }

  clearHaveFechasExtremas(){
    this.haveFechasExtremas = false;
    this.dataFile.fechaExtremaInicio = null;
    this.dataFile.fechaExtremaFin = null;
    this.dataFile.fechaDocumento = null;

  }

  isFormValid(form: NgForm){
    if(form.valid){
      if(this.dataFile){
       return this.dataFile.pais && (this.dataFile.tieneArchivoFisico && this.dataFile.tieneArchivoFisico.value == '1' || (this.dataFile.tieneArchivoFisico && this.dataFile.tieneArchivoFisico.value == '0' && this.dataFile.almacen)) &&
        (this.dataFile.nivelUnidad && this.dataFile.estructuraOrganizativa && this.dataFile.usuarioEntrega && this.dataFile.estadoConservacion && this.dataFile.tipoMaterial);
      }else{
        return false;
      }
    }else {
      return false;
    }

  }

  ngOnDestroy() {
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }

}
