import { CommonsService } from '../../../../../core/services/commons.service';
import { ActivatedRoute } from '@angular/router';

import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from "@angular/core";
import { EventEmitter, Input, Output } from '@angular/core';

import { PaginationResponse } from './../../../../../core/models/pagination-response';
import { UserService } from './../../../../../core/services/user.service';
import { JLane, MOCK_LANES, MOCK_LANESorg,MOCK_LANESact } from "../interface/lane";
import { DOCUMENT } from '@angular/common';
import { User } from './../../../../../core/models/user';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ProjectService } from '../../../../../core/services/project.service';
import { SpringService } from 'src/app/core/services/spring.service';
import { Project } from '../../../../../core/models/project';
import { NgForm } from '@angular/forms';


//import { SpringService } from '../../../../../core/services/project.service';
import { Spring } from '../../../../../core/models/spring';
import { ToastrService } from 'ngx-toastr';

import { CompanyService } from 'src/app/core/services/company.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {ContentChild, Directive} from '@angular/core';
import { NewspringComponent } from '../modal/newspring/newspring.component';

const now = new Date();
@Component({
  selector: "board-dnd",
  templateUrl: "./board-dnd.component.html",
  styleUrls: ["./board-dnd.component.scss"]
})
export class BoardDndComponent implements OnInit {
  users: PaginationResponse;
  springProyect = [];
  lanescab: JLane[];
  lanes: JLane[];lanes1: JLane[];lanes2: JLane[];lanes3: JLane[];lanes4: JLane[];lanes5: JLane[];lanes6: JLane[];lanes7: JLane[];lanes8: JLane[];lanes9: JLane[];lanes10: JLane[];lanes11: JLane[];lanes12: JLane[];lanes13: JLane[];lanes14: JLane[];lanes15: JLane[];lanes16: JLane[];lanes17: JLane[];lanes18: JLane[];lanes19: JLane[];lanes20: JLane[];
  contreg: number;
  @Input()
  project: Project;
  spring: Spring;

  @Output()
  onBack: EventEmitter<any> = new EventEmitter<any>();
  environment = environment;
  step:number = 1;
  page: number = 1;
  word:string;
  dataSpring: any;
  data: any;
  peso: string; 
  startDate: NgbDate | null;
  mstarDate: string; 
  mendtDate: string; 
  iteration:number = 0;

  //@ContentChild('modstartDate', {static: true}) modstartDate: ElementRef;
  @ViewChild('modstartDate') modstartDate: ElementRef;
  @ViewChild('modstartEnd') modstartEnd: ElementRef;
  @ViewChild('moditeration') moditeration: ElementRef;

  minDate1: NgbDateStruct = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

  private $eventNavigationEnd: Subscription;

  constructor( @Inject(DOCUMENT) private document: Document,private userService: UserService,
  private router: Router,private projectService: ProjectService,private companyService: 
  CompanyService,private springService: SpringService,private modal:NgbModal,private toastrService: ToastrService,private route: ActivatedRoute,) {}

  async ngOnInit() {
    
    this.route.data.subscribe((data) => {
      this.data = data;
      console.log(this.data)
    });


    //Moke tests for the board
    this.lanescab = MOCK_LANESorg;
    this.lanes= [];this.lanes1= [];this.lanes2= [];this.lanes3= [];this.lanes4= [];this.lanes5= [];this.lanes6= [];this.lanes7= [];this.lanes8= [];this.lanes9= [];this.lanes10= [];this.lanes11= [];this.lanes12= [];this.lanes13= [];this.lanes14= [];this.lanes15= [];this.lanes16= [];this.lanes17= [];this.lanes18= [];this.lanes19= [];this.lanes20= [];      
    //const verdata1  = await this.projectService.getBoardPanelById(localStorage.getItem('projectidselect'));
    //End Point to show all the springs of a project
    this.springProyect = await this.projectService.getSpringBoardPanelById(localStorage.getItem('projectidselect'));
    console.log('Spring Proyects', this.lanes);
    
    const verdata1  = await this.projectService.getBoardPanelBagLogById(localStorage.getItem('projectidselect'));
    if (verdata1.length > 0) { 
        console.log(verdata1.length);
     }
      this.contreg=0;
      for (var j = 0; j < verdata1.length; j++){
        console.log(verdata1[j].title);  
        console.log(verdata1[j].issues);  
        for (var x = 0; x < verdata1[j].issues.length; x++){
          console.log(verdata1[j].issues[x].id);  
          console.log(verdata1[j].issues[x].title);  
          this.contreg++;
          if (this.contreg == 1) {this.lanes = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 2) {this.lanes1 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 3) {this.lanes2 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 4) {this.lanes3 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 5) {this.lanes4 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 6) {this.lanes5 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 7) {this.lanes6 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 8) {this.lanes7 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 9) {this.lanes8 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 10) {this.lanes9 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 11) {this.lanes10 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 12) {this.lanes11 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 13) {this.lanes12 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 14) {this.lanes13 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 15) {this.lanes14 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 16) {this.lanes15 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 17) {this.lanes16 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 18) {this.lanes17 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 19) {this.lanes18 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 20) {this.lanes19 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 21) {this.lanes20 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}    
        }
      }

    console.log('Activity Task', this.lanes);
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
    this.users = await this.userService.getUsersPaginated({ page: this.page, rowByPage: environment.paginator.row_per_page, word: this.word ? this.word : null});
  }

  
  //Change Spring Method
  async onChangeSpring(event: any) {
    this.lanes= [];this.lanes1= [];this.lanes2= [];this.lanes3= [];this.lanes4= [];this.lanes5= [];this.lanes6= [];this.lanes7= [];this.lanes8= [];this.lanes9= [];this.lanes10= [];this.lanes11= [];this.lanes12= [];this.lanes13= [];this.lanes14= [];this.lanes15= [];this.lanes16= [];this.lanes17= [];this.lanes18= [];this.lanes19= [];this.lanes20= [];      
   /* this.lanes = await this.projectService.getBoardPanelById(event.id); */
    const verdata1  = await this.projectService.getBoardpanelspringbacklogById(event.id);
    if (verdata1.length > 0) { 
        console.log(verdata1.length);
     }
      this.contreg=0;
      for (var j = 0; j < verdata1.length; j++){
        console.log(verdata1[j].title);  
        console.log(verdata1[j].issues);  
        for (var x = 0; x < verdata1[j].issues.length; x++){
          console.log(verdata1[j].issues[x].id);  
          console.log(verdata1[j].issues[x].title);  
          this.contreg++;
          if (this.contreg == 1) {this.lanes = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 2) {this.lanes1 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 3) {this.lanes2 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 4) {this.lanes3 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 5) {this.lanes4 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 6) {this.lanes5 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 7) {this.lanes6 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 8) {this.lanes7 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 9) {this.lanes8 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 10) {this.lanes9 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 11) {this.lanes10 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 12) {this.lanes11 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 13) {this.lanes12 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 14) {this.lanes13 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 15) {this.lanes14 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 16) {this.lanes15 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 17) {this.lanes16 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 18) {this.lanes17 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 19) {this.lanes18 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 20) {this.lanes19 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}else if (this.contreg == 21) {this.lanes20 = await this.projectService.getBoardPanelActivityById(verdata1[j].issues[x].id);}    
        }
      }

  }

  /* back(item:any){
    this.step--;
    this.loadPage(this.page);
  } */

  back() {
    this.step--;
    this.onBack.emit(null);
  }

  openNewSpring(){
      //this.spring.iteration==1;
      //this.modal.open(NewspringComponent,{backdropClass:'azul'});
      this.modal.open(NewspringComponent,{centered: true,backdropClass:'azul'});
      //const ref = this.modalService.open(EditUserComponent, { centered: true });

    /*   const ref = this.modalService.open(EditUserComponent, { centered: true });
    ref.componentInstance.selectedUser = userModel; */




  }

    //Method to verify form and persist data
  async onSubmit(form: NgForm) {

    await this.springService.storeSpring( Spring.mapForPost(this.spring));

  }

  async saveNewSpring(){
    /* var modStarDate1 = this.modstartDate.nativeElement.value;
    var modStartEnd2 = this.modstartEnd.nativeElement.value;
    var moditeration3 = this.moditeration.nativeElement.value;
    console.log(modStarDate1);
    console.log(modStartEnd2);
    console.log(moditeration3); */
    
    //await this.projectService.storeProject(Project.mapForPost(this.project));
    console.log("el valor de la fecha ");
    const asfecha = this.modstartDate.nativeElement; 
    console.log(asfecha);

    this.data = await this.springService.getSpringItem();
    console.log(this.data);

    await this.springService.storeSpring( Spring.mapForPost(this.spring));

    console.log("LISTO");

    /* console.log(this.spring.startDate);
    console.log(this.spring.endDate);
    console.log(this.spring.iteration); */

    //this.modal.open(contenidospringnew,{backdropClass:'azul'});
}

}
