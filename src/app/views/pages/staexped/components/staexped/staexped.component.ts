import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, TemplateRef, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent, Calendar } from '@fullcalendar/angular';
import { environment } from './../../../../../../environments/environment';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonsService } from './../../../../../core/services/commons.service';
import { UserService } from './../../../../../core/services/user.service';
import { User } from './../../../../../core/models/user';
import { NgForm } from '@angular/forms';
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { filter, Subscription } from 'rxjs';
import { ExppersonalinformationService } from '../../../../../core/services/exppersonalinformation';
import { ExpPersonalInformation } from './../../../../../core/models/exp-personal-information'
import * as saveAs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { SelectOption } from '../../../../../core/models/select-option';
import { Console } from 'console';

@Component({
  selector: 'app-staexped',
  templateUrl: './staexped.component.html',
  styleUrls: ['./staexped.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StaexpedComponent extends BaseComponent implements OnInit {
  @ViewChild('inputFile')
  inputFile: ElementRef;

  exppersonalinformation:ExpPersonalInformation=new ExpPersonalInformation();
  data: any;
  defaultView:boolean=true
  step:number = 1;
  users: PaginationResponse;
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  totalItems: number;
  page: number = 1;
  previousPage: number;
  showPagination: boolean;
  selectedItem: User;
  word:string;
  environment = environment;
  tiprepots: number =1;
  lock: boolean = false;
  lockReports: boolean = false;
  selectedItemUserLoad: Array<SelectOption>;

  reports: any[] = [
    { id: 1, value: 'Expedientes-Detalles-Lineal', label: 'Expedientes-Detalles-Lineal' },
    { id: 2, value: 'Expedientes-Estudios-Academicos', label: 'Expedientes-Estudios-Academicos' },
    { id: 3, value: 'Expedientes-Especialidades-Area', label: 'Expedientes-Especialidades-Area'},
    { id: 4, value: 'Expedientes-Transferencias', label: 'Expedientes-Transferencias' },
    { id: 5, value: 'Expedientes-Promocion', label: 'Expedientes-Promocion' },
    { id: 6, value: 'Expedientes-Vacaciones', label: 'Expedientes-Vacaciones' },
    { id: 7, value: 'Expedientes-Permisos', label: 'Expedientes-Permisos' },
    { id: 8, value: 'Expedientes-Reposos', label: 'Expedientes-Reposos' },
];

reportsEcel: any[] = [
  { id: 1, value: '1', label: 'Datos Personales' },
  { id: 2, value: '2', label: 'Estudios Academicos' },
  { id: 3, value: '3', label: 'Especialidades en Areas' },
  { id: 4, value: '4', label: 'Documentos de ingresos'},
  { id: 5, value: '5', label: 'Controles varios' },
  { id: 6, value: '6', label: 'Movimientos (Transferencia)' },
  { id: 7, value: '7', label: 'Movimientos (Promoción)' },
  { id: 8, value: '8', label: 'Movimientos (Vacaciones)' },
  { id: 9, value: '9', label: 'Movimientos (Permisos)' },
  { id: 10, value: '10', label: 'Movimientos (Reposos)' },
  { id: 11, value: '11', label: 'Fideicomiso' },
  { id: 12, value: '12', label: 'Seguridad y Salud Laboral' },
  { id: 13, value: '13', label: 'Otros' },
];


  private $eventNavigationEnd: Subscription;
  constructor(private userService: UserService,
    private toastrService: ToastrService,
    private exppersonalinformationService: ExppersonalinformationService,
    private router: Router) {
    super();
   }
  async ngOnInit() {
    this.users = await this.userService.getUsersPaginated({ page: environment.paginator.default_page, rowByPage: environment.paginator.row_per_page, word: null });
    this.$eventNavigationEnd = this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.step = 1;
      this.loadPage(environment.paginator.default_page);
    });

    const info = localStorage.getItem('arrayUsersRepots');
    if (info=='"true"') {
      this.lockReports=true;
    }else{
      this.lockReports=false;
    }
    console.log("Ves reportes");
    console.log(info);

    this.selectedItemUserLoad = await this.exppersonalinformationService.getUserLoad();


  }
  async loadPage(pageInfo: any) {
    console.log('pageInfo', pageInfo);
    this.page = pageInfo;
    this.users = null;
    this.users = await this.userService.getUsersPaginated({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null});
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
      this.loadPage(environment.paginator.default_page);
    }
  }
  changeView(change:boolean){
    this.defaultView = change;
  }
  ngOnDestroy(){
    if (this.$eventNavigationEnd) {
      this.$eventNavigationEnd.unsubscribe()
    }
  }

  async validReports(event: number) {
    this.tiprepots = event;
  }
async repotsImp() {
if (this.tiprepots==1){
  this.lock = true;
  const resp = await this.exppersonalinformationService.reports(this.tiprepots);
  if (resp) {
      let file = this.convertBase64ToFile(resp.file, resp.title);
      saveAs(file, resp.title + '.' + resp.extension);
  }
    this.lock = false;
}else if (this.tiprepots==2){
 //customizado
      this.lock = true;
      this.exppersonalinformation.reporttype=this.tiprepots;
      const resp = await this.exppersonalinformationService.reportsExcel(this.exppersonalinformation.reportsSelectEcel.value);
      //const resp = await this.exppersonalinformationService.reportsExcel(ExpPersonalInformation.mapForPostRepotsExcel(this.exppersonalinformation));
      if (resp) {
          let file = this.convertBase64ToFile(resp.file, resp.title);
          saveAs(file, resp.title + '.' + resp.extension);
      }
      this.lock = false;

}else if (this.tiprepots==3){

  console.log("llamadas para cargar EXCEL");

 /*  { id: 1, value: '1', label: 'Datos Personales' },
  { id: 2, value: '2', label: 'Estudios Academicos' },
  { id: 3, value: '3', label: 'Especialidades en Areas' },
  { id: 4, value: '4', label: 'Documentos de ingresos'},
  { id: 5, value: '5', label: 'Controles varios' },
  { id: 6, value: '6', label: 'Movimientos (Transferencia)' },
  { id: 7, value: '7', label: 'Movimientos (Promoción)' },
  { id: 8, value: '8', label: 'Movimientos (Vacaciones)' },
  { id: 9, value: '9', label: 'Movimientos (Permisos)' },
  { id: 10, value: '10', label: 'Movimientos (Reposos)' },
  { id: 11, value: '11', label: 'Fideicomiso' },
  { id: 12, value: '12', label: 'Seguridad y Salud Laboral' },
  { id: 13, value: '13', label: 'Otros' }, */

  if (this.exppersonalinformation.reportsSelectEcelCarg.value=='1'){
     //Datos Personales
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
         const upload = await this.exppersonalinformationService.reportsExcelPersonalinformation(formData);
         this.inputFile.nativeElement.value = null;
       }
     }
  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='2'){
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
         const upload = await this.exppersonalinformationService.reportsExcelAcademicstudies(formData);
         this.inputFile.nativeElement.value = null;
       }
     }
  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='3'){
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
        const upload = await this.exppersonalinformationService.reportsExcelSpecialtiesinAreas(formData);
        this.inputFile.nativeElement.value = null;
      }
    }

  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='4'){
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
        const upload = await this.exppersonalinformationService.reportsExcelincomeDocuments(formData);
        this.inputFile.nativeElement.value = null;
      }
    }


  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='5'){
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
        const upload = await this.exppersonalinformationService.reportsExcelVariousControls(formData);
        this.inputFile.nativeElement.value = null;
      }
    }
  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='6'){
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
        const upload = await this.exppersonalinformationService.reportsExcelTransferMovements(formData);
        this.inputFile.nativeElement.value = null;
      }
    }

  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='7'){
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
        const upload = await this.exppersonalinformationService.reportsExcelMovementsPromotion(formData);
        this.inputFile.nativeElement.value = null;
      }
    }
    
  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='8'){
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
        const upload = await this.exppersonalinformationService.reportsExcelMovementsHolidays(formData);
        this.inputFile.nativeElement.value = null;
      }
    }

  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='9'){
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
        const upload = await this.exppersonalinformationService.reportsExcelMovementsPermits(formData);
        this.inputFile.nativeElement.value = null;
      }
    }

  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='10'){
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
        const upload = await this.exppersonalinformationService.reportsExcelMovementsRests(formData);
        this.inputFile.nativeElement.value = null;
      }
    }

  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='11'){
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
        const upload = await this.exppersonalinformationService.reportsExcelEscrow(formData);
        this.inputFile.nativeElement.value = null;
      }
    }

  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='12'){
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
        const upload = await this.exppersonalinformationService.reportsExcelOccupationalHealthSafety(formData);
        this.inputFile.nativeElement.value = null;
      }
    }

  }else if (this.exppersonalinformation.reportsSelectEcelCarg.value=='13'){
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
        const upload = await this.exppersonalinformationService.reportsExcelOthers(formData);
        this.inputFile.nativeElement.value = null;
      }
    }


  

    

  }

  //console.log(this.exppersonalinformation.reportsSelectEcelCarg.value);
  
}else if (this.tiprepots==4){
  const fcehDateFrom = this.exppersonalinformation.date_From.year+'-'+this.exppersonalinformation.date_From.month +'-'+this.exppersonalinformation.date_From.day;
  const fcehDateUntil = this.exppersonalinformation.date_Until.year+'-'+this.exppersonalinformation.date_Until.month +'-'+this.exppersonalinformation.date_Until.day;
  const resp = await this.exppersonalinformationService.reportsUserLoad(this.exppersonalinformation.selectedItemUserLoad.label,fcehDateFrom,fcehDateUntil);
  if (resp) {
      let file = this.convertBase64ToFile(resp.file, resp.title);
      saveAs(file, resp.title + '.' + resp.extension);
  }
    this.lock = false;
 

 }
}

}