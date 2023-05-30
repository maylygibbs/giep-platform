import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, FullCalendarComponent, Calendar } from '@fullcalendar/angular';
import { environment } from './../../../../../../environments/environment';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonsService } from './../../../../../core/services/commons.service';
import { UserService } from './../../../../../core/services/user.service';
import { ExppersonalinformationService } from '../../../../../core/services/exppersonalinformation';
import { User } from './../../../../../core/models/user';
import { ExpPersonalInformation } from './../../../../../core/models/exp-personal-information'
import { Academicstudy } from './../../../../../core/models/academicstudy'
import { Areaspecialties } from 'src/app/core/models/areaspecialties';
import { Movtransfers } from 'src/app/core/models/movtransfers';
import { Promotion } from 'src/app/core/models/promotion';
import { Permission } from 'src/app/core/models/permission';
import { Repose } from 'src/app/core/models/repose';
import { Reasonrest } from 'src/app/core/models/reasonrest';
import { Vacation } from 'src/app/core/models/vacation';
import { Safetyhealth } from 'src/app/core/models/safetyhealth';
import { Others } from 'src/app/core/models/others';
import { Variouscontrols } from 'src/app/core/models/variouscontrols';
import { Escrow } from 'src/app/core/models/escrow';
import { Incomedocuments } from 'src/app/core/models/incomedocuments';
import { Profession } from 'src/app/core/models/profession';
import { Typereasonfile } from 'src/app/core/models/typereasonfile';
import { Permissiontype } from 'src/app/core/models/permissiontype';
import { Sleeptype } from 'src/app/core/models/sleeptype';
import { Vacationtype } from 'src/app/core/models/vacationtype';
import { Department } from 'src/app/core/models/department';
import { NgForm } from '@angular/forms';
import * as moment from "moment";
import { BaseComponent } from '../../../../../views/shared/components/base/base.component';
import { SelectOption } from '../../../../../core/models/select-option';
import { AnswersService } from './../../../../../core/services/answers.service';
import { ProfessionService } from './../../../../../core/services/profession.service';
import { AcademicstudyService } from './../../../../../core/services/academicstudy.service';
import { AreaspecialtiesService } from './../../../../../core/services/areaspecialties.service';
import { MovtransfersService } from './../../../../../core/services/movtransfers.service';
import { AreaService } from './../../../../../core/services/area.service';
import { DepartmentService } from './../../../../../core/services/department.service';
import { RegionService } from './../../../../../core/services/region.service';
import { PromotionService } from './../../../../../core/services/promotion.service';
import { PermissiontypeService } from '../../../../../core/services/permissiontype.service';
import { PermissionService } from '../../../../../core/services/permission.service';
import { ReposeService } from '../../../../../core/services/repose.service';
import { ReasonrestService } from '../../../../../core/services/reasonrest.service';
import { VacationtypeService } from '../../../../../core/services/vacationtype.service';
import { VacationService } from '../../../../../core/services/vacation.service';
import { SafetyhealthService } from '../../../../../core/services/safetyhealth.service';
import { OtherscategoricService } from '../../../../../core/services/otherscategoric.service';
import { OthersService } from '../../../../../core/services/others.service';
import { VariouscontrolsService } from '../../../../../core/services/variouscontrols.service';
import { EscrowService } from '../../../../../core/services/escrow.service';
import { IncomedocumentsService } from '../../../../../core/services/incomedocuments.service';
import { TypereasonfileService } from '../../../../../core/services/typereasonfile.service';
import { SleeptypeService } from 'src/app/core/services/sleeptype.service';
import { Answers } from './../../../../../core/models/answers';
import { ToastrService } from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Area } from 'src/app/core/models/area';

@Component({
  selector: 'app-staexped-store',
  templateUrl: './staexped-store.component.html',
  styleUrls: ['./staexped-store.component.scss']
})
export class StaexpedStoreComponent extends BaseComponent implements OnInit {

  @Input()
  user:User;
  academicstudys: Academicstudy;
  exppersonalinformation:ExpPersonalInformation=new ExpPersonalInformation();
  academicstudy: Academicstudy=new Academicstudy();
  areaspecialties:Areaspecialties=new Areaspecialties();
  mmovtransfers:Movtransfers=new Movtransfers();
  promotion:Promotion=new Promotion();
  permission:Permission=new Permission();
  repose: Repose=new Repose();
  vacation: Vacation=new Vacation();
  safetyhealth: Safetyhealth=new Safetyhealth();
  others: Others=new Others();
  variouscontrols: Variouscontrols=new Variouscontrols();
  escrow: Escrow=new Escrow();
  incomedocuments: Incomedocuments=new Incomedocuments();
  profession: Profession=new Profession();
  typereasonfile: Typereasonfile=new Typereasonfile();
  permissiontype: Permissiontype=new Permissiontype();
  sleeptype: Sleeptype=new Sleeptype();
  reasonres: Reasonrest=new Reasonrest();
  vacationtype: Vacationtype=new Vacationtype();
  department: Department=new Department();
  area: Area=new Area();
  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();
  isLoading = false;
  assignedAcademicstudy: Array<Academicstudy>;
  assignedAreaspecialties: Array<Areaspecialties>;
  assignedMovtransfers: Array<Movtransfers>;
  assignedPromotion: Array<Promotion>;
  assignedPermission: Array<Permission>;
  positions: Array<SelectOption>;
  reasonrest: Array<Reasonrest>;
  assignedRepose: Array<Repose>;
  assignedVacation: Array<Vacation>;
  assignedSafetyhealth: Array<Safetyhealth>;
  assignedOthers: Array<Others>;
  assignedVariouscontrols: Array<Variouscontrols>;
  assignedEscrow: Array<Escrow>;
  assignedIncomedocuments: Array<Incomedocuments>;
  assignedProfession: Array<Profession>;
  assignedTypereasonfile: Array<Typereasonfile>;
  assignedPermissiontype: Array<Permissiontype>;
  assignedSleeptype: Array<Sleeptype>;
  assignedReasonrest: Array<Reasonrest>;
  assignedVacationtype: Array<Vacationtype>;
  assignedDepartment: Array<Department>;
  assignedArea: Array<Area>;
  selectedAutorizacion: Array<SelectOption>;
  selectedArea: Array<SelectOption>;
  idSelectedItem: number =0;
  idSelectedItemArea: number =0;
  idSelectedItemTransArea: number =0;
  idSelectedItemTransRegion: number =0;
  idSelectedItemTransDepartamento: number =0;
  idSelectedItemCargo: number =0;
  idSelectedItempermissionreason: number =0;
  idSelectedItempermissionauthorization_permissions: number =0;
  idSelectedItempermissiondate_from: number =0;
  idSelectedItempermissiondate_until: number =0;
  idSelectedItempermissionpermission_reason_id: number =0;
  vald: number =0;
  idonline: number =0;
  environment = environment;
  step:number = 1;
  assignedResources: Array<User>;
  identificationCard: number;
  idEntryAuthorization: string;
  idfamilyBusiness: string;
  selectedItem: ExpPersonalInformation;
  isCitiesControlVisible = true;
  startDate: NgbDate | null;
//********************************** */
  data:any;
  userStatus:boolean;
  /** Select options list **/
  dependences: Array<SelectOption>;
  roles:Array<SelectOption>;
  defaultImage = 'https://via.placeholder.com/200x200';
  image = 'https://via.placeholder.com/200x200';
  states:Array<SelectOption>;
  cities:Array<SelectOption>;
  message: string; // <--- Nuevo atributo
  /**
   * Función que recibe evento del componente anidado
   * @param $event
   */
  receiveMessage($event) {
    this.message = $event;
  }
  //Builder Method
  constructor(private route: ActivatedRoute,private modal:NgbModal,
    private userService:UserService,
    private commonsService: CommonsService,
    private exppersonalinformationService: ExppersonalinformationService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private answersService: AnswersService,
    private professionService: ProfessionService,
    private academicstudyService: AcademicstudyService,
    private areaspecialtiesService: AreaspecialtiesService,
    private areaService: AreaService,
    private movtransfersService: MovtransfersService,
    private departmentService : DepartmentService,
    private regionservice : RegionService,
    private promotionservice : PromotionService,
    private permissiontypeService : PermissiontypeService,
    private permissionService : PermissionService,
    private reasonrestService : ReasonrestService,
    private reposeService : ReposeService,
    private sleeptypeService : SleeptypeService,
    private vacationtypeService : VacationtypeService,
    private vacationService : VacationService,
    private safetyhealthService : SafetyhealthService,
    private otherscategoricService : OtherscategoricService,
    private othersService : OthersService,
    private variouscontrolsService : VariouscontrolsService,
    private escrowService : EscrowService,
    private incomedocumentsService : IncomedocumentsService,
    private movtransfers: MovtransfersService,
    private typereasonfileService: TypereasonfileService,
    
    
    private router: Router) {
      super();
     }
  ngOnInit(): void {
   this.route.data.subscribe((data)=>{      
    this.data = data;
  });
  this.data.age ='';
  this.onChangeTiempo(2); 
  if(!this.user.id){
    this.user.status = new SelectOption('1');
    this.userStatus = true;
  }else{
    this.userStatus = this.user.status.value == '1'? true: false;
  }
  this.answers();
  this.answersci(this.user.documentNumber);
 }
//Method to verify form and persist data
 async onSubmit(form: NgForm) {
 }
//Method to answers
 async answers() {
  this.data.selectedItem = await this.answersService.getAnswers();
  this.data.selectedRegion = await this.regionservice.getRegion();
  this.data.selectedOthers  = await this.otherscategoricService.getOthers();
 }
  //Method search documentNumber
  async search() {
   this.step++;
  this.selectedItem  = await this.userService.getUserByCi(parseInt(this.exppersonalinformation.documentNumber));
 }
 //Method Filling in the lists
 async answersci(ci) {
  const verdata1= await this.exppersonalinformationService.getStaffById(ci);
  if (verdata1) {
    const events1 = verdata1.map((ep: ExpPersonalInformation, index: number) => {
      this.exppersonalinformation.id=ep.id;
      this.academicstudy.idPersonal=ep.id;
      this.idonline = ep.id;
      this.exppersonalinformation.admissionDate=ep.admissionDate;
      this.exppersonalinformation.entryAuthorization=ep.entryAuthorization;
      this.exppersonalinformation.familyBusiness=ep.familyBusiness;
      this.onChangeTiempo(1);
      this.professionlist();
      this.Typereasonfilelist();
      this.Reasonpermissionlist();
      this.Sleeptypelist();
      this.Reasonrestlist();
      this.Vacationtypelist();
      this.Departmentlist();
      this.Arealist();
      this.academicstudylist(); 
      this.areaspecialtieslist();
      this.movtransferslist();
      this.promotionlist();
      this.permissionlist();
      this.reposelist();
      this.vacationlist();
      this.Safetyhealthlist();
      this.Otherslist();
      this.Variouscontrolslist();
      this.Escrowlist();
      this.Incomedocumentslist();
   });
  }
}
 //Method Filling in the lists
async answersconci(ci) {
  const verdata1= await this.exppersonalinformationService.getStaffById(ci);
  if (verdata1) {
    const events1 = verdata1.map((ep: ExpPersonalInformation, index: number) => {
      this.exppersonalinformation.id=ep.id;
      this.academicstudy.idPersonal=ep.id;
      this.idonline = ep.id;
      this.exppersonalinformation.admissionDate=ep.admissionDate;
      this.exppersonalinformation.entryAuthorization=ep.entryAuthorization;
      this.exppersonalinformation.familyBusiness=ep.familyBusiness;
   });
  }
}
//Method Area List
async Arealist() {
  this.data.selectedArea = await this.areaService.getArea();
  const verdatat= await this.areaService.getAreav();
  if (verdatat) {
    const events1 = verdatat.map((ac: Area, index: number) => {
      //this.area.id=ac.id;
    });
    this.assignedArea = verdatat.map((u: Area, index: number) => {
      const datat = new Area();
      datat.id = u.id;
      datat.area = u.area;
      datat.idDepartment = u.idDepartment;
      return datat;
    });
  }
}
//Method Area
async onChangeAreaM(event: any) {
  if(event){
    const verdatat= await this.areaService.getAreamById(event.value);
     this.assignedArea = verdatat.map((u: Area, index: number) => {
      const datat = new Area();
      datat.id = u.id;
      datat.area = u.area;
      datat.idDepartment = u.idDepartment;
      return datat;
    });
  }
 }
//Method Department List
async Departmentlist() {
  this.data.selectedDepartment = await this.departmentService.getDepartment();
  const verdatat= await this.departmentService.getDepartmentv();
  if (verdatat) {
    const events1 = verdatat.map((ac: Reasonrest, index: number) => {
      //this.department.id=ac.id;
    });
    this.assignedDepartment = verdatat.map((u: Department, index: number) => {
      const datat = new Department();
      datat.id = u.id;
      datat.department = u.department;
      return datat;
    });
  }
}
//Method Vacation Type List
async Vacationtypelist() {
  this.data.selectedvacationtype  = await this.vacationtypeService.getVacationtype();
  const verdatat= await this.vacationtypeService.getVacationtypev();
  if (verdatat) {
    const events1 = verdatat.map((ac: Reasonrest, index: number) => {
      //this.vacationtype.id=ac.id;
    });
    this.assignedVacationtype = verdatat.map((u: Vacationtype, index: number) => {
      const datat = new Vacationtype();
      datat.id = u.id;
      datat.vacationType = u.vacationType;
      return datat;
    });
  }
}
//Method Reason Rest List 
async Reasonrestlist() {
  this.data.selectedreasonrest  = await this.reasonrestService.getReasonrest();
  const verdatat= await this.reasonrestService.getReasonrestv();
  if (verdatat) {
    const events1 = verdatat.map((ac: Reasonrest, index: number) => {
      //this.reasonres.id=ac.id;
    });
    this.assignedReasonrest = verdatat.map((u: Reasonrest, index: number) => {
      const datat = new Reasonrest();
      datat.id = u.id;
      datat.reasonRest = u.reasonRest;
      return datat;
    });
  }
}
//Method Sleep Type List 
async Sleeptypelist() {
  this.data.selectedSleeptypeService  = await this.sleeptypeService.getSleeptype();
  const verdatat= await this.sleeptypeService.getSleeptypev();
  if (verdatat) {
    const events1 = verdatat.map((ac: Sleeptype, index: number) => {
      //this.sleeptype.id=ac.id;
    });
    this.assignedSleeptype = verdatat.map((u: Sleeptype, index: number) => {
      const datat = new Sleeptype();
      datat.id = u.id;
      datat.sleepType = u.sleepType;
      return datat;
    });
  }
}
//Method Reason Permission List
async Reasonpermissionlist() {
  this.data.selectedReasonPermission = await this.permissiontypeService.getReasonPermission();
  const verdatat= await this.permissiontypeService.getReasonPermissionv();
  if (verdatat) {
    const events1 = verdatat.map((ac: Permissiontype, index: number) => {
      //this.permissiontype.id=ac.id;
    });
    this.assignedPermissiontype = verdatat.map((u: Permissiontype, index: number) => {
      const datat = new Permissiontype();
      datat.id = u.id;
      datat.permission = u.permission;
      return datat;
    });
  }
}
//Method Type Reason File List
async Typereasonfilelist() {
  this.data.selectedTypereasonfile = await this.typereasonfileService.getTypereasonfile();
  const verdatat= await this.typereasonfileService.getTypereasonfilev();
  if (verdatat) {
    const events1 = verdatat.map((ac: Typereasonfile, index: number) => {
      //this.profession.id=ac.id;
    });
    this.assignedTypereasonfile = verdatat.map((u: Typereasonfile, index: number) => {
      const datat = new Typereasonfile();
      datat.id = u.id;
      datat.typeReasonFile = u.typeReasonFile;
      return datat;
    });
  }
}
//Method Profession List
async professionlist() {
  this.data.selectedProfession = await this.professionService.getProfession();
  const verdatap= await this.professionService.getProfessionv();
  if (verdatap) {
    const events1 = verdatap.map((ac: Profession, index: number) => {
      //this.profession.id=ac.id;
    });
    this.assignedProfession = verdatap.map((u: Profession, index: number) => {
      const datap = new Profession();
      datap.id = u.id;
      datap.professio = u.professio;
      return datap;
    });
  }
}
//*********************************************************************************************** */
//*********************************************************************************************** */
//Method Academic Study List 
 async academicstudylist() {
  const verdata2= await this.academicstudyService.getAcademicStudyById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Academicstudy, index: number) => {
      this.academicstudy.idPersonal=ac.idPersonal;
    });
    this.assignedAcademicstudy = verdata2.map((u: Academicstudy, index: number) => {
      const academicstudy = new Academicstudy();
      academicstudy.id = u.id;
      academicstudy.idPersonal = u.idPersonal;
      academicstudy.idProfesion = u.idProfesion;
      academicstudy.dateGraduatedlt = u.dateGraduatedlt;
      academicstudy.dateGraduated = u.dateGraduated;
      return academicstudy;
    });
  }
 }
//Method Area Specialties List
 async areaspecialtieslist() {
  const verdata2= await this.areaspecialtiesService.getAreaSpecialtiesById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Areaspecialties, index: number) => {
      this.areaspecialties.idPersonal=ac.idPersonal;
    });
      this.assignedAreaspecialties = verdata2.map((u: Areaspecialties, index: number) => {
      const areaspecialties = new Areaspecialties();
      areaspecialties.id = u.id;
      areaspecialties.idPersonal = u.idPersonal;
      areaspecialties.idArea = u.idArea;
      return areaspecialties;
    });
  }
 }
//Method Mov Transfers List 
 async movtransferslist() {
  const verdata2= await this.movtransfersService.getMovtransfersById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Movtransfers, index: number) => {
      this.mmovtransfers.idPersonal=ac.idPersonal;
    });
      this.assignedMovtransfers = verdata2.map((u: Movtransfers, index: number) => {
      const movtransfers = new Movtransfers();
      movtransfers.id = u.id;
      movtransfers.department_Id = u.department_Id;
      movtransfers.idPersonal = u.idPersonal;
      movtransfers.idArea = u.idArea;
      movtransfers.id_Region = u.id_Region;
      movtransfers.transfer_Date = u.transfer_Date.year+'-'+u.transfer_Date.month +'-'+u.transfer_Date.day;
      return movtransfers;
    });
  }
 }
//Method Promotion List
 async promotionlist() {
  const verdata2= await this.promotionservice.getPromotionById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Promotion, index: number) => {
      this.promotion.idPersonal=ac.idPersonal;
    });
      this.assignedPromotion = verdata2.map((u: Promotion, index: number) => {
      const movtransfers = new Promotion();
      movtransfers.id = u.id;
      movtransfers.idPersonal = u.idPersonal;
      movtransfers.idCargo = u.idCargo;
      movtransfers.promotion_Date = u.promotion_Date.year+'-'+u.promotion_Date.month +'-'+u.promotion_Date.day;
      return movtransfers;
    });
  }
 }
 //Method Permission List 
 async permissionlist() {
  const verdata2= await this.permissionService.getPermissionById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Permission, index: number) => {
      this.permission.idPersonal=ac.idPersonal;
      //this.permission.authorization_permissions=ac.authorization_permissions;
    });
      this.assignedPermission = verdata2.map((u: Permission, index: number) => {
      const movtransfers = new Permission();
      movtransfers.id = u.id;
      movtransfers.idPersonal = u.idPersonal;
      movtransfers.authorization_Permissions = u.authorization_Permissions;
      movtransfers.permission_Reason_Id = u.permission_Reason_Id;
      movtransfers.date_Fromv = u.date_Fromv;
      movtransfers.date_Untilv = u.date_Untilv;
      movtransfers.date_From = u.date_From.year+'-'+u.date_From.month +'-'+u.date_From.day;
      movtransfers.date_Until = u.date_Until.year+'-'+u.date_Until.month +'-'+u.date_Until.day;
      movtransfers.timeCalculation = 0;
      return movtransfers;
    });
  }
 }
 //Method Repose List
 async reposelist() {
  const verdata2= await this.reposeService.getReposeById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Repose, index: number) => {
      this.repose.idPersonal=ac.idPersonal;
    });
      this.assignedRepose = verdata2.map((u: Repose, index: number) => {
      const movtransfers = new Repose();
      movtransfers.id = u.id;
      movtransfers.idPersonal = u.idPersonal;
      movtransfers.id_Reason_Rest = u.id_Reason_Rest;
      movtransfers.id_Tipoposo = u.id_Tipoposo;
      movtransfers.date_Fromv = u.date_Fromv;
      movtransfers.date_Untilv = u.date_Untilv;
      movtransfers.date_From = u.date_From.year+'-'+u.date_From.month +'-'+u.date_From.day;
      movtransfers.date_Until = u.date_Until.year+'-'+u.date_Until.month +'-'+u.date_Until.day;
      movtransfers.timeCalculation = 0;
      return movtransfers;
    });
  }
 }
//Method Vacation List 
 async vacationlist() {
  const verdata2= await this.vacationService.getVacationById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Vacation, index: number) => {
      this.vacation.idPersonal=ac.idPersonal;
    });
      this.assignedVacation = verdata2.map((u: Vacation, index: number) => {
      const movtransfers = new Vacation();
      movtransfers.id = u.id;
      movtransfers.idPersonal = u.idPersonal;
      movtransfers.vacation_Type_Id = u.vacation_Type_Id;
      movtransfers.vacation_Authorization = u.vacation_Authorization;
      movtransfers.date_Fromv = u.date_Fromv;
      movtransfers.date_Untilv = u.date_Untilv;
      movtransfers.date_Incorporationv = u.date_Incorporationv;
      movtransfers.cumulative_Periods = u.cumulative_Periods;
      movtransfers.enjoy_Period = u.enjoy_Period;
      movtransfers.timeCalculation = 0;
      return movtransfers;
    });
  }
 }
//Method Safetyhealth List 
 async Safetyhealthlist() {
  const verdata2= await this.safetyhealthService.getSafetyhealthById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Safetyhealth, index: number) => {
      this.safetyhealth.id=ac.id;
      this.safetyhealth.idPersonal=ac.idPersonal;
      this.safetyhealth.copy_Registration_Delegate=ac.copy_Registration_Delegate;
      this.safetyhealth.delivery_Protection_Equipment=ac.delivery_Protection_Equipment;
      this.safetyhealth.metro_Route=ac.metro_Route;
      this.safetyhealth.proof_Safety_Rules=ac.proof_Safety_Rules;
      this.safetyhealth.record_Occupational_Exams=ac.record_Occupational_Exams;
      this.safetyhealth.work_Insurance_Analysis=ac.work_Insurance_Analysis;
    });
      this.assignedSafetyhealth = verdata2.map((u: Safetyhealth, index: number) => {
      const movtransfers = new Safetyhealth();
      movtransfers.id = u.id;
      movtransfers.idPersonal = u.idPersonal;
      movtransfers.copy_Registration_Delegate = u.copy_Registration_Delegate;
      movtransfers.delivery_Protection_Equipment = u.delivery_Protection_Equipment;
      movtransfers.metro_Route = u.metro_Route;
      movtransfers.proof_Safety_Rules = u.proof_Safety_Rules;
      movtransfers.record_Occupational_Exams = u.record_Occupational_Exams;
      movtransfers.work_Insurance_Analysis = u.work_Insurance_Analysis;

      return movtransfers;
    });
  }
 }
//Method Others List
 async Otherslist() {
  const verdata2= await this.othersService.getOthersById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Others, index: number) => {
      this.others.id=ac.id;
      this.others.idPersonal=ac.idPersonal;
      this.others.id_Category_Others=ac.id_Category_Others;
      this.others.labor_Area_Development_Course=ac.labor_Area_Development_Course;
      this.others.legal_Files=ac.legal_Files;
      this.others.reason=ac.reason;
      this.others.service_Area_Oriented_Profession=ac.service_Area_Oriented_Profession
    });
      this.assignedOthers = verdata2.map((u: Others, index: number) => {
      const movtransfers = new Others();
      movtransfers.id = u.id;
      movtransfers.idPersonal = u.idPersonal;
      movtransfers.id_Category_Others = u.id_Category_Others;
      movtransfers.labor_Area_Development_Course = u.labor_Area_Development_Course;
      movtransfers.legal_Files = u.legal_Files;
      movtransfers.reason = u.reason;
      movtransfers.service_Area_Oriented_Profession = u.service_Area_Oriented_Profession;
      return movtransfers;
    });
  }
 }
//Method Various Controls List 
 async Variouscontrolslist() {
  const verdata2= await this. variouscontrolsService.getVariouscontrolsById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Variouscontrols, index: number) => {
      this.variouscontrols.id=ac.id;
      this.variouscontrols.enrolled_Ivss=ac.enrolled_Ivss;
      this.variouscontrols.internal_Rules=ac.internal_Rules;
      this.variouscontrols.shape_Ari=ac.shape_Ari;
    });
      this.assignedVariouscontrols = verdata2.map((u: Variouscontrols, index: number) => {
      const movtransfers = new Variouscontrols();
      movtransfers.id = u.id;
      movtransfers.enrolled_Ivss = u.enrolled_Ivss;
      movtransfers.internal_Rules = u.internal_Rules;
      movtransfers.shape_Ari = u.shape_Ari;
      return movtransfers;
    });
  }
 }
//Method Escrow List 
 async Escrowlist() {
  const verdata2= await this.escrowService.getEscrowById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Escrow, index: number) => {
      this.escrow.id=ac.id;
      this.escrow.annual_Interest_Receipt=ac.annual_Interest_Receipt;
      this.escrow.const_Depos_Prestac_Sociales = ac.const_Depos_Prestac_Sociales;
    });
      this.assignedEscrow = verdata2.map((u: Escrow, index: number) => {
      const movtransfers = new Escrow();
      movtransfers.id = u.id;
      movtransfers.annual_Interest_Receipt = u.annual_Interest_Receipt;
      movtransfers.const_Depos_Prestac_Sociales = u.const_Depos_Prestac_Sociales;
      return movtransfers;
    });
  }
 }
//Method Income Documents List 
 async Incomedocumentslist() {
  const verdata2= await this.incomedocumentsService.getIncomedocumentsById(this.academicstudy.idPersonal);
  if (verdata2) {
    const events1 = verdata2.map((ac: Incomedocuments, index: number) => {
      this.incomedocuments.id=ac.id;
      this.incomedocuments.job_Application=ac.job_Application;
      this.incomedocuments.curricular_Synthesis=ac.curricular_Synthesis;
      this.incomedocuments.copia_Cedula=ac.copia_Cedula;
      this.incomedocuments.record_Work=ac.record_Work;
      this.incomedocuments.reg_Fiscal_Information=ac.reg_Fiscal_Information;
      this.incomedocuments.labor_Ref_Verification=ac.labor_Ref_Verification;
      this.incomedocuments.certification_Affidavit_Affidavit=ac.certification_Affidavit_Affidavit;
      this.incomedocuments.license=ac.license;
      this.incomedocuments.medical_Certificate=ac.medical_Certificate;
      this.incomedocuments.point_Account=ac.point_Account;
      this.incomedocuments.own_Title=ac.own_Title;
      this.incomedocuments.job_Description=ac.job_Description;
      this.incomedocuments.id_Confidentiality=ac.id_Confidentiality;
      this.incomedocuments.id_Charge=ac.id_Charge;
      this.incomedocuments.department_Id=ac.department_Id;
      this.incomedocuments.id_Area=ac.id_Area;
      this.incomedocuments.id_Region=ac.id_Region;
 
    });
      this.assignedIncomedocuments = verdata2.map((u: Incomedocuments, index: number) => {
      const movtransfers = new Incomedocuments();
      movtransfers.id = u.id;
      movtransfers.job_Application=u.job_Application;
      movtransfers.curricular_Synthesis=u.curricular_Synthesis;
      movtransfers.copia_Cedula=u.copia_Cedula;
      movtransfers.record_Work=u.record_Work;
      movtransfers.reg_Fiscal_Information=u.reg_Fiscal_Information;
      movtransfers.labor_Ref_Verification=u.labor_Ref_Verification;
      movtransfers.certification_Affidavit_Affidavit=u.certification_Affidavit_Affidavit;
      movtransfers.license=u.license;
      movtransfers.medical_Certificate=u.medical_Certificate;
      movtransfers.point_Account=u.point_Account;
      movtransfers.own_Title=u.own_Title;
      movtransfers.job_Description=u.job_Description;
      movtransfers.id_Confidentiality=u.id_Confidentiality;
      movtransfers.id_Charge=u.id_Charge;
      movtransfers.department_Id=u.department_Id;
      movtransfers.id_Area=u.id_Area;
      movtransfers.id_Region=u.id_Region;
      return movtransfers;
    });
  }
 }
  //Method that checks the back
  back() {
   this.onBack.emit(null);
 }
  //Method that verifies change of answers
  async onChangeEntryAuthorization(event: any) {
    if(event){
    this.onChangeTiempo(1); 
    this.idEntryAuthorization= event.value;
    }
   }
  //Method that verifies change of answers
  async onChangeArea(event: any) {
    if(event){
       this.data.selectedArea = await this.areaService.getAreaById(event.value);
    }
   }
   //Method that verifies change of answers
  async onChangeEspcArea(event: any) {
    if(event){
       this.data.selectedEspcArea = await this.areaService.getAreaById(event.value);
    }
   }
//Method that verifies change of Family Business
async  onChangeFamilyBusiness(event: any) {
  if(event){
    this.idfamilyBusiness = event.value;
  }
 }
 //Method onChange Tiempo
async onChangeTiempo(numop) {
    if(numop==1){
      if(this.exppersonalinformation.admissionDate){
         const convertAge = new Date(this.exppersonalinformation.admissionDate.year+'-'+this.exppersonalinformation.admissionDate.month+'-'+this.exppersonalinformation.admissionDate.day);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        const time = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
        this.exppersonalinformation.elapsedtime = time;
        this.data.elapsedtime = time;
      }
    }else{
      if(this.user.birthDate){
         const convertAge = new Date(this.user.birthDate.year+'-'+this.user.birthDate.month+'-'+this.user.birthDate.day);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        const time = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
        this.data.age = time;
        this.exppersonalinformation.age = time;
      }
    }
   
  }
//Method to verify form and persist data save staff
  async saveStaff() {
    if (this.exppersonalinformation.admissionDate.value || this.exppersonalinformation.entryAuthorization.value || this.exppersonalinformation.familyBusiness.value ){
      this.exppersonalinformation.documentNumber = this.user.documentNumber;
      this.exppersonalinformationService.storeStaff(ExpPersonalInformation.mapForPost(this.exppersonalinformation)).finally(() => 
      this.answersconci(this.user.documentNumber)
      );
   }
  }
//Method to verify form and persist data save Academicstudy
async saveAcademicstudy() {
  if (this.exppersonalinformation.id){
  if (this.academicstudy.dateGraduated.value || this.academicstudy.idProfesion.value) {
    if (this.assignedAcademicstudy) { 
      for (var j = 0; j <  this.assignedAcademicstudy.length; j++){
        if (this.assignedAcademicstudy[j].idProfesion.id == this.idSelectedItem ) { 
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.academicstudy.dateGraduated){}
        if (!this.academicstudy.idProfesion.value){}
          this.exppersonalinformation.documentNumber = this.user.documentNumber;
          this.academicstudy.idPersonal = this.exppersonalinformation.id;
          this.academicstudy.idPersonal = this.idonline;
          this.academicstudyService.storeAcademicstudy(Academicstudy.mapForPost(this.academicstudy)).finally(() => 
          this.academicstudylist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
  }else{
    this.toastrService.error('Ingrece Datos Personales.'); 
  }
}
//Method to verify form and persist data save area specialties
async saveAreaspecialties() {
  if (this.exppersonalinformation.id){
  if (this.areaspecialties.idArea.value) {
    if (this.assignedAreaspecialties) { 
      for (var j = 0; j <  this.assignedAreaspecialties.length; j++){
        if (this.assignedAreaspecialties[j].idArea.id == this.idSelectedItemArea) { 
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
        }else{
          this.vald = 1;
        }
     }
    }else{
      this.vald = 1;
    } 
  
    if (this.vald==1){
        if (!this.areaspecialties.idArea.value){}
          this.exppersonalinformation.documentNumber = this.user.documentNumber;
          this.areaspecialties.idPersonal = this.exppersonalinformation.id;
          this.areaspecialtiesService.storeAreaspecialties(Areaspecialties.mapForPost(this.areaspecialties)).finally(() => 
          this.areaspecialtieslist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
//Method to verify form and persist data save MovTransf
async saveMovTransf() {
  if (this.exppersonalinformation.id){
  if (this.mmovtransfers.idArea.value) {
    if (this.assignedMovtransfers) { 
      for (var j = 0; j <  this.assignedMovtransfers.length; j++){
        if (this.assignedMovtransfers[j].idArea.id == this.idSelectedItemTransArea && this.assignedMovtransfers[j].id_Region.id == this.idSelectedItemTransRegion && this.assignedMovtransfers[j].department_Id.id == this.  idSelectedItemTransDepartamento) { 
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
  
    if (this.vald==1){
        if (!this.mmovtransfers.idArea.value){}
          this.exppersonalinformation.documentNumber = this.user.documentNumber;
          this.mmovtransfers.idPersonal = this.exppersonalinformation.id;
          this.movtransfersService.storeMovtransfers(Movtransfers.mapForPost(this.mmovtransfers)).finally(() => 
          this.movtransferslist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
//Method to verify form and persist data save promotion
async savePromotion() {
  if (this.exppersonalinformation.id){
  if (this.promotion.idCargo.value || this.promotion.promotion_Date.value) {
    if (this.assignedPromotion) { 
      for (var j = 0; j <  this.assignedPromotion.length; j++){
        if (this.assignedPromotion[j].idCargo.id == this.idSelectedItemCargo) { 
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.promotion.idCargo.value || !this.promotion.promotion_Date.value) {}
          this.exppersonalinformation.documentNumber = this.user.documentNumber;
          this.promotion.idPersonal = this.exppersonalinformation.id;
          this.promotionservice.storePromotion(Promotion.mapForPost(this.promotion)).finally(() => 
          this.promotionlist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
//Method to verify form and persist data save permission
async savePermission() {
  this.vald = 1;
  if (this.exppersonalinformation.id){
  if (this.permission.authorization_Permissions.value || this.permission.permission_Reason_Id.value || this.permission.date_From.value || this.permission.date_Until.value) {
    if (this.assignedPermission) { 
      for (var j = 0; j <  this.assignedPermission.length; j++){
        if (this.assignedPermission[j].authorization_Permissions.id == parseInt(this.permission.authorization_Permissions.value) && this.assignedPermission[j].permission_Reason_Id.id == parseInt(this.permission.permission_Reason_Id.value)) {   
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.permission.authorization_Permissions.value || !this.permission.permission_Reason_Id.value || !this.permission.date_From.value || !this.permission.date_Until.value) {}
          let dateFrom =  this.permission.date_From.year+'-'+this.permission.date_From.month +'-'+this.permission.date_From.day;
          let date_Until =  this.permission.date_Until.year+'-'+this.permission.date_Until.month +'-'+this.permission.date_Until.day;
          if (date_Until < dateFrom ) { //This checks if time is in the past. If so, 
            this.toastrService.error('No se permiten selección de fechas anteriores verifique fecha hasta.'); 
          }else{
          this.exppersonalinformation.documentNumber = this.user.documentNumber;
          this.permission.idPersonal = this.exppersonalinformation.id;
          this.permissionService.storePermission(Permission.mapForPost(this.permission)).finally(() => 
          this.permissionlist()
          );

          this.vald = 0;

      }
    }
    this.vald = 0;
 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
//Method to verify form and persist data save repose
async saveRepose() {
  this.vald = 1;
  if (this.exppersonalinformation.id){
  if (this.repose.id_Tipoposo.value || this.repose.id_Reason_Rest.value || this.repose.date_From.value || this.repose.date_Until.value) {
    if (this.assignedRepose) { 
      for (var j = 0; j <  this.assignedRepose.length; j++){
        if (this.assignedRepose[j].id_Tipoposo.id == parseInt(this.repose.id_Tipoposo.value) && this.assignedRepose[j].id_Reason_Rest.id == parseInt(this.repose.id_Reason_Rest.value)) {   
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.repose.id_Tipoposo.value || !this.repose.id_Reason_Rest.value || !this.repose.date_From.value || !this.repose.date_Until.value) {}
        let dateFrom =  this.repose.date_From.year+'-'+this.repose.date_From.month +'-'+this.repose.date_From.day;
        let date_Until =  this.repose.date_Until.year+'-'+this.repose.date_Until.month +'-'+this.repose.date_Until.day;
        if (date_Until < dateFrom ) { //This checks if time is in the past. If so, 
          this.toastrService.error('No se permiten selección de fechas anteriores verifique fecha hasta.'); 
        }else{
          this.exppersonalinformation.documentNumber = this.user.documentNumber;
          this.repose.idPersonal = this.exppersonalinformation.id;
          this.reposeService.storeRepose(Repose.mapForPost(this.repose)).finally(() => 
          this.reposelist()
          );
          this.vald = 0;
       }
    }
    this.vald = 0;
 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
//Method to verify form and persist data save vacation
async saveVacation() {
  this.vald = 1;
  if (this.exppersonalinformation.id){
  if (this.vacation.vacation_Authorization.value || this.vacation.vacation_Type_Id.value || this.vacation.date_From.value || this.vacation.date_Until.value || this.vacation.date_Incorporation.value || this.vacation.enjoy_Period || this.vacation.cumulative_Periods) {
    if (this.assignedVacation) { 
      for (var j = 0; j <  this.assignedVacation.length; j++){
        if (this.assignedVacation[j].vacation_Authorization.id == parseInt(this.vacation.vacation_Authorization.value) && this.assignedVacation[j].vacation_Type_Id.id == parseInt(this.vacation.vacation_Type_Id.value)) {   
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
  
    if (this.vald==1){
        if (!this.vacation.vacation_Authorization.value || !this.vacation.vacation_Type_Id.value || !this.vacation.date_From.value || !this.vacation.date_Until.value || !this.vacation.date_Incorporation.value || !this.vacation.enjoy_Period || !this.vacation.cumulative_Periods) {}
        let dateFrom =  this.vacation.date_From.year+'-'+this.vacation.date_From.month +'-'+this.vacation.date_From.day;
        let date_Until =  this.vacation.date_Until.year+'-'+this.vacation.date_Until.month +'-'+this.vacation.date_Until.day;
        let date_Incorporation =  this.vacation.date_Incorporation.year+'-'+this.vacation.date_Incorporation.month +'-'+this.vacation.date_Incorporation.day;
          if (date_Until < dateFrom ) { //This checks if time is in the past. If so, 
            this.toastrService.error('No se permiten selección de fechas anteriores verifique fecha hasta.'); 
          }else{
            if ( date_Incorporation < date_Until ) { //This checks if time is in the past. If so, 
              this.toastrService.error('No se permiten selección de fechas anteriores verifique fecha incorporación.'); 
            }else{
          this.exppersonalinformation.documentNumber = this.user.documentNumber;
          this.vacation.idPersonal = this.exppersonalinformation.id;
          this.vacationService.storeVacation(Vacation.mapForPost(this.vacation)).finally(() => 
          this.vacationlist()
          );

          this.vald = 0;
      }
     }
    }
    this.vald = 0;



 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
//Method to verify form and persist data save safetyhealth
async saveSafetyhealth() {
  if (this.exppersonalinformation.id){
  if (this.safetyhealth.copy_Registration_Delegate.value || this.safetyhealth.delivery_Protection_Equipment.value || this.safetyhealth.metro_Route.value || this.safetyhealth.proof_Safety_Rules.value || this.safetyhealth.record_Occupational_Exams.value || this.safetyhealth.work_Insurance_Analysis.value) {
    if (this.assignedSafetyhealth) { 
      for (var j = 0; j <  this.assignedSafetyhealth.length; j++){
        if (this.assignedSafetyhealth[j].copy_Registration_Delegate.id == parseInt(this.safetyhealth.copy_Registration_Delegate.value) && this.assignedSafetyhealth[j].delivery_Protection_Equipment.id == parseInt(this.safetyhealth.delivery_Protection_Equipment.value) && this.assignedSafetyhealth[j].metro_Route.id == parseInt(this.safetyhealth.metro_Route.value) && this.assignedSafetyhealth[j].proof_Safety_Rules.id == parseInt(this.safetyhealth.proof_Safety_Rules.value) && this.assignedSafetyhealth[j].record_Occupational_Exams.id == parseInt(this.safetyhealth.record_Occupational_Exams.value) && this.assignedSafetyhealth[j].work_Insurance_Analysis.id == parseInt(this.safetyhealth.work_Insurance_Analysis.value)) {   
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
  
    if (this.vald==1){
        if (!this.safetyhealth.copy_Registration_Delegate.value || !this.safetyhealth.delivery_Protection_Equipment.value || !this.safetyhealth.metro_Route.value || !this.safetyhealth.proof_Safety_Rules.value || !this.safetyhealth.record_Occupational_Exams.value || !this.safetyhealth.work_Insurance_Analysis.value) {}
          this.safetyhealth.idPersonal = this.exppersonalinformation.id;
          this.safetyhealthService.storeSafetyhealth(Safetyhealth.mapForPost(this.safetyhealth)).finally(() => 
          this.Safetyhealthlist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
//Method to verify form and persist data save others
async saveOthers() {
  if (this.exppersonalinformation.id){
  if (this.others.id_Category_Others.value || this.others.labor_Area_Development_Course.value || this.others.legal_Files.value || this.others.reason.value || this.others.service_Area_Oriented_Profession.value) {
    if (this.assignedOthers) { 
      for (var j = 0; j <  this.assignedOthers.length; j++){
        if (this.assignedOthers[j].id_Category_Others.id == parseInt(this.others.id_Category_Others.value) && this.assignedOthers[j].labor_Area_Development_Course.id == parseInt(this.others.labor_Area_Development_Course.value) && this.assignedOthers[j].legal_Files.id == parseInt(this.others.legal_Files.value) && this.assignedOthers[j].reason.id == parseInt(this.others.reason.value) && this.assignedOthers[j].service_Area_Oriented_Profession.id == parseInt(this.others.service_Area_Oriented_Profession.value)) {   
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (!this.assignedOthers) { 
      this.vald = 1;
    }
    if (this.vald==1){
        if (!this.others.id_Category_Others.value || !this.others.labor_Area_Development_Course.value || !this.others.legal_Files.value || !this.others.reason.value || !this.others.service_Area_Oriented_Profession.value) {}
          this.others.idPersonal = this.exppersonalinformation.id;
          this.othersService.storeOthers(Others.mapForPost(this.others)).finally(() => 
          this.Otherslist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
//Method to verify form and persist data save various contrls 
async saveVariouscontrls() {
  if (this.exppersonalinformation.id){
  if (this.variouscontrols.enrolled_Ivss.value || this.variouscontrols.internal_Rules.value || this.variouscontrols.shape_Ari.value) {
    if (this.assignedVariouscontrols) { 
      for (var j = 0; j <  this.assignedVariouscontrols.length; j++){
        if (this.assignedVariouscontrols[j].enrolled_Ivss.id == parseInt(this.variouscontrols.enrolled_Ivss.value) && this.assignedVariouscontrols[j].internal_Rules.id == parseInt(this.variouscontrols.internal_Rules.value) && this.assignedVariouscontrols[j].shape_Ari.id == parseInt(this.variouscontrols.shape_Ari.value)) {   
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.variouscontrols.enrolled_Ivss.value || !this.variouscontrols.internal_Rules.value || !this.variouscontrols.shape_Ari.value) {}
          this.variouscontrols.idPersonal = this.exppersonalinformation.id;
          this.variouscontrolsService.storeVariouscontrols(Variouscontrols.mapForPost(this.variouscontrols)).finally(() => 
          this.Variouscontrolslist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
//Method to verify form and persist data save escrow
async saveEscrow() {
  if (this.exppersonalinformation.id){
  if (this.escrow.annual_Interest_Receipt.value || this.escrow.const_Depos_Prestac_Sociales.value) {
    if (this.assignedEscrow) { 
      for (var j = 0; j <  this.assignedEscrow.length; j++){
        if (this.assignedEscrow[j].annual_Interest_Receipt.id == parseInt(this.escrow.annual_Interest_Receipt.value) && this.assignedEscrow[j].const_Depos_Prestac_Sociales.id == parseInt(this.escrow.const_Depos_Prestac_Sociales.value)) {   
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.escrow.annual_Interest_Receipt.value || !this.escrow.const_Depos_Prestac_Sociales.value) {}
          this.escrow.idPersonal = this.exppersonalinformation.id;
          this.escrowService.storeEscrow(Escrow.mapForPost(this.escrow)).finally(() => 
          this.Escrowlist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
//Method to verify form and persist data save income documents
async SaveIncomedocuments() {
  if (this.exppersonalinformation.id){
  if (this.incomedocuments.job_Application.value || this.incomedocuments.curricular_Synthesis.value) {
    if (this.assignedIncomedocuments) { 
      for (var j = 0; j <  this.assignedIncomedocuments.length; j++){
        if (this.assignedIncomedocuments[j].job_Application.id == parseInt(this.incomedocuments.job_Application.value) && this.assignedIncomedocuments[j].curricular_Synthesis.id == parseInt(this.incomedocuments.curricular_Synthesis.value)) {   
          this.toastrService.error('Verifique el items seleccionado ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.incomedocuments.job_Application.value || !this.incomedocuments.curricular_Synthesis.value) {}
          this.incomedocuments.idPersonal = this.exppersonalinformation.id;
          this.incomedocumentsService.storeIncomedocuments(Incomedocuments.mapForPost(this.incomedocuments)).finally(() => 
          this.Incomedocumentslist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}else{
  this.toastrService.error('Ingrece Datos Personales.'); 
}
}
 //Change Academic Study Method
  async onChangeAcademicStudy(event: any) {
    if(event){
    this.idSelectedItem =event.value;
    }
  }
  //Change Academic Study Method
  async onChangeTransfarea(event: any) {
    if(event){
    this.idSelectedItemTransArea =event.value;
    }
  }
  //Change Academic Study Method
  async onChangeTransfRegion(event: any) {
    if(event){
    this.idSelectedItemTransRegion =event.value;
    }
  }
  //Change Academic Study Method
  async onChangeTransfDepart(event: any) {
    if(event){
    this.idSelectedItemTransDepartamento =event.value;
    this.data.selectedAreaTransf = await this.areaService.getAreaById(event.value);
    }
  }
  //Change Academic Study Method
  async onChangePromotionCargo(event: any) {
    if(event){
    this.idSelectedItemCargo =event.value;
    }
  }
//Method to delete academic study
deleteAcademicstudy(academy:Academicstudy){
  this.academicstudyService.storeAcademicstudyDelete(academy.id).finally(() => 
  this.academicstudylist()
  );
}
//Method to delete area specialties 
deleteAreaspecialties(areaspecialties:Areaspecialties){
  this.areaspecialtiesService.storeAreaspecialtiesDelete(areaspecialties.id).finally(() => 
   this.areaspecialtieslist()
  );
}
//Method to delete mov transf
deleteMovTransf(movtransfers:Movtransfers){
  this.movtransfersService.storeMovtransfersDelete(movtransfers.id).finally(() => 
   this.movtransferslist()
  );
}
//Method to delete promotion
deletePromotion(promotion:Promotion){
  this.promotionservice.storePromotionDelete(promotion.id).finally(() => 
   this.promotionlist()
  );
}
//Method to delete permission
deletePermission(permission:Permission){
  this.permissionService.storePermissionDelete(permission.id).finally(() => 
   this.permissionlist()
  );
}
//Method to delete repose
deleteRepose(repose:Repose){
  this.reposeService.storeReposeDelete(repose.id).finally(() => 
   this.reposelist()
  );
}
//Method to delete vacation
deleteVacation(vacation:Vacation){
  this.vacationService.storeVacationDelete(vacation.id).finally(() => 
   this.vacationlist()
  );
}
//Method to open new profession 
async openNewProfession(contenidonew){
  this.modal.open(contenidonew,{backdropClass:'azul'});
}
//Method to open new type reasonfile
async openNewtypereasonfile(newtypereasonfile){
   this.modal.open(newtypereasonfile,{backdropClass:'azul'});
}
//Method to open new permission type 
async openNewpermissiontype(newpermissiontype){
  this.modal.open(newpermissiontype,{backdropClass:'azul'});
}
//Method to open new sleep type
async openNewSleeptype(newsleeptype){
  this.modal.open(newsleeptype,{backdropClass:'azul'});
}
//Method to open new reasonres 
async openNewReasonres(newsleeptype){
  this.modal.open(newsleeptype,{backdropClass:'azul'});
}
//Method to open new vacation type
async openNewvacationtype(newvacationtype){
  this.modal.open(newvacationtype,{backdropClass:'azul'});
}
//Method to open new department
async openNewdepartment(newdepartment){
  this.modal.open(newdepartment,{backdropClass:'azul'});
}
//Method to open new area
async openNewarea(newarea){
  this.modal.open(newarea,{backdropClass:'azul'});
}
//Method modal save new profession
async SaveNewProfession() {
  if (this.profession.professio) {
    if (this.assignedProfession) { 
      for (var j = 0; j <  this.assignedProfession.length; j++){
        if (this.assignedProfession[j].professio == this.profession.professio) {   
          this.toastrService.error('Verifique el items ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.profession.professio) {}
          this.incomedocuments.idPersonal = this.exppersonalinformation.id;
          this.professionService.storeProfession(Profession.mapForPost(this.profession)).finally(() => 
          this.professionlist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
 
}
//Method modal save new type reason file 
async SaveNewTypereasonfile() {
  if (this.typereasonfile.typeReasonFile) {
    if (this.assignedTypereasonfile) { 
      for (var j = 0; j <  this.assignedTypereasonfile.length; j++){
        if (this.assignedTypereasonfile[j].typeReasonFile == this.typereasonfile.typeReasonFile) {   
          this.toastrService.error('Verifique el items ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.profession.professio) {}
          this.incomedocuments.idPersonal = this.exppersonalinformation.id;
          this.typereasonfileService.storeTypereasonfile(Typereasonfile.mapForPost(this.typereasonfile)).finally(() => 
          this.Typereasonfilelist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
 
}
//Method modal save new permission type
async SaveNewPermissiontype() {
  if (this.permissiontype.permission) {
    if (this.assignedPermissiontype) { 
      for (var j = 0; j <  this.assignedPermissiontype.length; j++){
        if (this.assignedPermissiontype[j].permission == this.permissiontype.permission) {   
          this.toastrService.error('Verifique el items ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.permissiontype.permission) {}
          this.incomedocuments.idPersonal = this.exppersonalinformation.id;
          this.permissiontypeService.storetReasonPermission(Permissiontype.mapForPost(this.permissiontype)).finally(() => 
          this.Reasonpermissionlist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}
//Method modal save new sleep type
async SaveNewSleeptype() {
  if (this.sleeptype.sleepType) {
    if (this.assignedPermissiontype) { 
      for (var j = 0; j <  this.assignedPermissiontype.length; j++){
        if (this.assignedPermissiontype[j].permission == this.sleeptype.sleepType) {   
          this.toastrService.error('Verifique el items ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.sleeptype.sleepType) {}
          this.incomedocuments.idPersonal = this.exppersonalinformation.id;
          this.sleeptypeService.storetSleeptype(Sleeptype.mapForPost(this.sleeptype)).finally(() => 
          this.Sleeptypelist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
 
}
//Method modal save new reason res
async SaveNewReasonres() {
  if (this.reasonres.reasonRest) {
    if (this.assignedReasonrest) { 
      for (var j = 0; j <  this.assignedReasonrest.length; j++){
        if (this.assignedReasonrest[j].reasonRest == this.reasonres.reasonRest) {   
          this.toastrService.error('Verifique el items ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
     if (this.vald==1){
        if (!this.reasonres.reasonRest) {}
          this.incomedocuments.idPersonal = this.exppersonalinformation.id;
          this.reasonrestService.storeReasonrest(Reasonrest.mapForPost(this.reasonres)).finally(() => 
          this.Reasonrestlist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}
//Method modal save new vacation type
async SaveNewVacationtype() {
  if (this.vacationtype.vacationType) {
    if (this.assignedVacationtype) { 
      for (var j = 0; j <  this.assignedVacationtype.length; j++){
        if (this.assignedVacationtype[j].vacationType == this.vacationtype.vacationType) {   
          this.toastrService.error('Verifique el items ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.vacationtype.vacationType) {}
          this.incomedocuments.idPersonal = this.exppersonalinformation.id;
          this.vacationtypeService.storeVacationtype(Vacationtype.mapForPost(this.vacationtype)).finally(() => 
          this.Vacationtypelist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
 
}
//Method modal save new department
async SaveNewDepartment() {
  if (this.department.department) {
    if (this.assignedDepartment) { 
      for (var j = 0; j <  this.assignedDepartment.length; j++){
        if (this.assignedDepartment[j].department == this.department.department) {   
          this.toastrService.error('Verifique el items ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.department.department) {}
          this.incomedocuments.idPersonal = this.exppersonalinformation.id;
          this.departmentService.storeDepartment(Department.mapForPost(this.department)).finally(() => 
          this.Departmentlist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}
//Method modal save new area
async SaveNewArea() {
  if (this.area.area) {
    if (this.assignedArea) { 
      for (var j = 0; j <  this.assignedArea.length; j++){
        if (this.assignedArea[j].area == this.area.area) {   
          this.toastrService.error('Verifique el items ya existe.'); 
          this.vald = 0;
          break;
        }else{
          this.vald = 1;
        }
      }
    }else{
      this.vald = 1;
    } 
    if (this.vald==1){
        if (!this.area.area) {}
          this.incomedocuments.idPersonal = this.exppersonalinformation.id;
          this.areaService.storeArea(Area.mapForPost(this.area)).finally(() => 
          this.Arealist()
          );
          this.vald = 0;
    }
    this.vald = 0;
 }
}
}
